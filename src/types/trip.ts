import { WeatherData } from './index';

export type BudgetLevel = 'Low' | 'Medium' | 'High';
export type TravelType = 'Solo' | 'Family' | 'Friends' | 'Couple';
export type InterestType = 
  | 'Adventure' 
  | 'Nature' 
  | 'Food' 
  | 'History' 
  | 'Shopping' 
  | 'Beaches' 
  | 'Spiritual';

export interface TripFormInputs {
  destination: string;
  days: number;
  budget: BudgetLevel;
  travelType: TravelType;
  interests: InterestType[];
}

export interface DaySlot {
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  placesToVisit: string[];
  recommendedFood?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  morning: DaySlot;
  afternoon: DaySlot;
  evening: DaySlot;
  foodRecommendations: string[];
  estimatedDailyBudget: string;
}

export interface HotelRecommendation {
  name: string;
  address: string;
  pricePerNight: string;
}

export interface GeneratedTrip {
  id?: string;
  userId?: string;
  destination: string;
  days: number;
  budget: BudgetLevel;
  travelType: TravelType;
  interests: InterestType[];
  bestTimeToVisit: string;
  overallEstimatedBudget: string;
  travelTips: string[];
  itinerary: ItineraryDay[];
  recommendedHotels?: HotelRecommendation[];
  weather?: WeatherData;
  createdAt?: string;
}
