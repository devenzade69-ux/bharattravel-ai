export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export type TravelType = 'Solo' | 'Family' | 'Friends' | 'Couple';
export type BudgetType = 'Low' | 'Medium' | 'High';

export interface TripPlannerInput {
  destination: string;
  days: number;
  budget: BudgetType;
  travelType: TravelType;
}

export interface Place {
  name: string;
  details: string;
  timeToVisit?: string;
  ticketPrice?: string;
  imageUrl?: string;
}

export interface Hotel {
  name: string;
  address: string;
  pricePerNight: string;
  rating?: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  places: Place[];
}

export interface BudgetBreakdown {
  estimatedTotal: number;
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  currency: string;
}

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

export interface TripPlan {
  id?: string;
  userId?: string;
  destination: string;
  days: number;
  budget: BudgetType;
  travelType: TravelType;
  createdAt?: string;
  itinerary: ItineraryDay[];
  hotels?: Hotel[];
  budgetBreakdown?: BudgetBreakdown;
  travelTips?: string[];
  weather?: WeatherData;
}
