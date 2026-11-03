export interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  weatherCondition: string;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  weatherIcon: string;
  error?: string;
}

export interface OpenWeatherRawResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

/**
 * Extracts primary city name from location strings (e.g. "Udaipur, Rajasthan, India" -> "Udaipur")
 */
export const extractCityName = (cityInput: string): string => {
  if (!cityInput) return 'Delhi';
  const parts = cityInput.split(/[,/]/);
  return parts[0].trim();
};

/**
 * Call OpenWeather API to get live weather for a city
 */
export const getWeather = async (city: string): Promise<WeatherData> => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const cleanCity = extractCityName(city);

  if (!API_KEY || API_KEY === 'your_openweather_api_key_here' || API_KEY === 'YOUR_OPENWEATHER_API_KEY_HERE') {
    console.warn('OpenWeather API Key is not configured or uses placeholder. Providing destination fallback data.');
    return getFallbackWeatherData(cleanCity, 'OpenWeather API Key is unconfigured. Showing estimated weather.');
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        return getFallbackWeatherData(cleanCity, 'Invalid OpenWeather API Key. Please verify your environment key.');
      } else if (response.status === 404) {
        // Try fallback search with first word of city name
        const firstWord = cleanCity.split(' ')[0];
        const retryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(firstWord)}&appid=${API_KEY}&units=metric`;
        const retryRes = await fetch(retryUrl);
        if (retryRes.ok) {
          const rawData: OpenWeatherRawResponse = await retryRes.json();
          return parseOpenWeatherData(rawData);
        }
        return getFallbackWeatherData(cleanCity, `City "${cleanCity}" not found on OpenWeather.`);
      } else if (response.status === 429) {
        return getFallbackWeatherData(cleanCity, 'OpenWeather API rate limit exceeded. Please try again later.');
      } else {
        return getFallbackWeatherData(cleanCity, `Weather service error (${response.status}).`);
      }
    }

    const rawData: OpenWeatherRawResponse = await response.json();
    return parseOpenWeatherData(rawData);
  } catch (err: any) {
    console.error('Error fetching OpenWeather data:', err);
    return getFallbackWeatherData(cleanCity, 'Network error while fetching weather data.');
  }
};

/**
 * Backward compatibility alias for existing components
 */
export const fetchDestinationWeather = getWeather;

/**
 * Helper to parse raw OpenWeather API JSON into clean WeatherData interface
 */
const parseOpenWeatherData = (data: OpenWeatherRawResponse): WeatherData => {
  const iconCode = data.weather[0]?.icon || '01d';
  return {
    cityName: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    weatherCondition: data.weather[0]?.main || 'Clear',
    weatherDescription: data.weather[0]?.description || 'Clear sky',
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
    weatherIcon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  };
};

/**
 * Smart climate profile fallbacks for Indian destinations if API is unreachable or key missing
 */
const getFallbackWeatherData = (city: string, errorMessage?: string): WeatherData => {
  const lower = city.toLowerCase();

  let temp = 27;
  let feels = 28;
  let condition = 'Clear';
  let desc = 'Pleasant & Moderate Climate';
  let hum = 55;
  let wind = 12;
  let icon = 'https://openweathermap.org/img/wn/01d@2x.png';

  if (lower.includes('goa') || lower.includes('mumbai') || lower.includes('kochi') || lower.includes('kerala')) {
    temp = 29;
    feels = 32;
    condition = 'Clouds';
    desc = 'Humid Tropical Breeze';
    hum = 78;
    wind = 14;
    icon = 'https://openweathermap.org/img/wn/02d@2x.png';
  } else if (lower.includes('manali') || lower.includes('shimla') || lower.includes('leh') || lower.includes('ladakh') || lower.includes('dharamshala')) {
    temp = 16;
    feels = 15;
    condition = 'Clear';
    desc = 'Crisp Mountain Air';
    hum = 45;
    wind = 8;
    icon = 'https://openweathermap.org/img/wn/01d@2x.png';
  } else if (lower.includes('jaipur') || lower.includes('udaipur') || lower.includes('jaisalmer') || lower.includes('rajasthan')) {
    temp = 28;
    feels = 29;
    condition = 'Sunny';
    desc = 'Clear & Sunny Skies';
    hum = 38;
    wind = 10;
    icon = 'https://openweathermap.org/img/wn/01d@2x.png';
  }

  return {
    cityName: city,
    temperature: temp,
    feelsLike: feels,
    weatherCondition: condition,
    weatherDescription: desc,
    humidity: hum,
    windSpeed: wind,
    weatherIcon: icon,
    error: errorMessage
  };
};
