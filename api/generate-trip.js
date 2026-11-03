// api/generate-trip.js
// Vercel Edge/Serverless Function — Groq API is called SERVER-SIDE here.
// GROQ_API_KEY is read from Vercel environment variables (never exposed to browser).

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers for same-origin Vercel deployment
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: GROQ_API_KEY is not set.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON request body.' });
  }

  const { destination, days, budget, travelType, interests } = body || {};

  if (!destination || !days || !budget || !travelType) {
    return res.status(400).json({ error: 'Missing required fields: destination, days, budget, travelType.' });
  }

  const interestsList = Array.isArray(interests) && interests.length > 0
    ? interests.join(', ')
    : 'General exploration';

  const prompt = `Create a detailed, realistic, and personalized travel itinerary for the following parameters:

- Destination: ${destination}
- Duration: ${days} days
- Budget Tier: ${budget}
- Travel Style: ${travelType}
- Traveler Interests: ${interestsList}

Return ONLY a valid, raw JSON object matching the exact structure below (no text before or after the JSON):

{
  "destination": "${destination}",
  "days": ${days},
  "budget": "${budget}",
  "travelType": "${travelType}",
  "interests": ${JSON.stringify(interests || [])},
  "bestTimeToVisit": "string (e.g. October to March)",
  "overallEstimatedBudget": "string (e.g. ₹15,000 - ₹20,000 per person)",
  "travelTips": [
    "Tip 1 regarding transport or culture",
    "Tip 2 regarding local etiquette or tickets",
    "Tip 3 regarding clothing or safety"
  ],
  "recommendedHotels": [
    {
      "name": "Hotel Name 1",
      "address": "Locality, City",
      "pricePerNight": "₹X,XXX/night"
    },
    {
      "name": "Hotel Name 2",
      "address": "Locality, City",
      "pricePerNight": "₹X,XXX/night"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 Title (e.g. Arrival & Heritage Tour)",
      "estimatedDailyBudget": "₹X,XXX",
      "foodRecommendations": ["Famous local dish 1", "Recommended eatery 2"],
      "morning": {
        "timeSlot": "Morning",
        "title": "Morning Activity Title",
        "description": "Detailed description of morning activity",
        "placesToVisit": ["Place 1", "Place 2"],
        "recommendedFood": "Breakfast recommendation"
      },
      "afternoon": {
        "timeSlot": "Afternoon",
        "title": "Afternoon Activity Title",
        "description": "Detailed description of afternoon activity",
        "placesToVisit": ["Place 3"],
        "recommendedFood": "Lunch recommendation"
      },
      "evening": {
        "timeSlot": "Evening",
        "title": "Evening Activity Title",
        "description": "Detailed description of evening activity",
        "placesToVisit": ["Place 4"],
        "recommendedFood": "Dinner recommendation"
      }
    }
  ]
}

Ensure the itinerary has exactly ${days} days in the itinerary array. Make the locations and food suggestions authentic to ${destination}, India.`;

  // Try primary model first, fallback to secondary
  const models = ['llama-3.3-70b-versatile', 'openai/gpt-oss-20b'];
  let lastError = null;

  for (const model of models) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert AI Travel Planner specializing in Indian travel and tourism. Output ONLY valid, raw JSON with no markdown backticks or commentary.'
            },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
          max_tokens: 4096
        })
      });

      if (!groqRes.ok) {
        const errData = await groqRes.json().catch(() => ({}));
        lastError = errData?.error?.message || `Groq API error ${groqRes.status}`;
        console.warn(`Model ${model} failed (${groqRes.status}): ${lastError}`);
        continue;
      }

      const groqData = await groqRes.json();
      const content = groqData.choices?.[0]?.message?.content;
      if (!content) {
        lastError = 'Empty response from Groq API';
        continue;
      }

      // Clean markdown fences if present
      let cleanJson = content.trim();
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsed = JSON.parse(cleanJson);
      return res.status(200).json({ ...parsed, _model: model });

    } catch (err) {
      lastError = err.message || 'Unknown error';
      console.warn(`Model ${model} threw error:`, lastError);
    }
  }

  // All models failed
  return res.status(502).json({
    error: getApiErrorMessage(lastError)
  });
}

function getApiErrorMessage(message) {
  if (!message) return 'Failed to generate itinerary. Please try again.';
  if (message.includes('rate_limit') || message.includes('429')) return 'AI rate limit exceeded. Please try again in a few moments.';
  if (message.includes('401') || message.includes('invalid_api_key')) return 'Server AI configuration error. Please contact support.';
  if (message.includes('model_not_found') || message.includes('404')) return 'AI model unavailable. Please try again later.';
  if (message.includes('timeout') || message.includes('504')) return 'AI request timed out. Please try again.';
  return 'Failed to generate itinerary. Please try again.';
}

