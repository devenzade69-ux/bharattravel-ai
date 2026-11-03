import { GeneratedTrip, TripFormInputs } from '../types/trip';

/**
 * Maps API errors to user-friendly messages
 */
export const getGroqErrorMessage = (error: any): string => {
  const message = error?.message || '';
  if (message.includes('rate_limit') || message.includes('429')) {
    return 'AI rate limit exceeded. Please try again in a few moments.';
  }
  if (message.includes('timeout') || message.includes('504')) {
    return 'The AI request timed out. Please try again.';
  }
  if (message.includes('fetch failed') || message.includes('NetworkError') || message.includes('Failed to fetch') || message.includes('network')) {
    return 'Network connection error. Please check your internet connection.';
  }
  if (message.includes('model_not_found') || message.includes('404')) {
    return 'The AI model is currently unavailable. Please try again later.';
  }
  if (message.includes('Server configuration error')) {
    return 'Server configuration error. Please contact support.';
  }
  return error?.message || 'Failed to generate itinerary. Please try again.';
};

/**
 * Generate a complete Indian travel itinerary via the secure Vercel API function.
 * The Groq API key is NEVER exposed to the browser — all AI calls happen server-side.
 */
export const generateTripItinerary = async (inputs: TripFormInputs): Promise<GeneratedTrip> => {
  try {
    const response = await fetch('/api/generate-trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: inputs.destination,
        days: inputs.days,
        budget: inputs.budget,
        travelType: inputs.travelType,
        interests: inputs.interests
      })
    });

    let data: any;
    try {
      data = await response.json();
    } catch {
      throw new Error('Invalid response from AI server. Please try again.');
    }

    if (!response.ok) {
      throw new Error(data?.error || `AI server error (${response.status}). Please try again.`);
    }

    // Validate essential fields
    if (!data.itinerary || !Array.isArray(data.itinerary)) {
      throw new Error('AI returned an invalid itinerary format. Please try again.');
    }

    const result: GeneratedTrip = {
      ...data,
      destination: inputs.destination,
      days: inputs.days,
      budget: inputs.budget,
      travelType: inputs.travelType,
      interests: inputs.interests,
      createdAt: new Date().toISOString()
    };

    return result;
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    throw new Error(getGroqErrorMessage(error));
  }
};
