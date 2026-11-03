import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { GeneratedTrip } from '../types/trip';

export const TRIPS_COLLECTION = 'trips';

/**
 * Save a generated trip itinerary to Cloud Firestore
 */
export const saveTripToFirestore = async (
  trip: GeneratedTrip, 
  userId: string
): Promise<string> => {
  if (!userId) {
    throw new Error('User must be logged in to save trips.');
  }

  const tripData = {
    userId,
    destination: trip.destination,
    days: trip.days,
    budget: trip.budget,
    travelType: trip.travelType,
    interests: trip.interests || [],
    itinerary: trip.itinerary,
    weather: trip.weather || null,
    bestTimeToVisit: trip.bestTimeToVisit || 'October to March',
    overallEstimatedBudget: trip.overallEstimatedBudget || '',
    travelTips: trip.travelTips || [],
    recommendedHotels: trip.recommendedHotels || [],
    createdAt: trip.createdAt || new Date().toISOString()
  };

  const docRef = await addDoc(collection(db, TRIPS_COLLECTION), tripData);
  return docRef.id;
};

/**
 * Fetch all saved trips for a specific user from Cloud Firestore
 */
export const getUserSavedTrips = async (userId: string): Promise<GeneratedTrip[]> => {
  if (!userId) return [];

  try {
    const q = query(
      collection(db, TRIPS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const trips: GeneratedTrip[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      trips.push({
        id: docSnap.id,
        userId: data.userId,
        destination: data.destination,
        days: data.days,
        budget: data.budget,
        travelType: data.travelType,
        interests: data.interests || [],
        itinerary: data.itinerary || [],
        weather: data.weather || null,
        bestTimeToVisit: data.bestTimeToVisit || '',
        overallEstimatedBudget: data.overallEstimatedBudget || '',
        travelTips: data.travelTips || [],
        recommendedHotels: data.recommendedHotels || [],
        createdAt: data.createdAt
      });
    });

    return trips;
  } catch (error) {
    console.error('Error fetching user saved trips:', error);
    // Fallback without ordering if Firestore composite index is missing
    const fallbackQuery = query(
      collection(db, TRIPS_COLLECTION),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(fallbackQuery);
    const trips: GeneratedTrip[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      trips.push({
        id: docSnap.id,
        userId: data.userId,
        destination: data.destination,
        days: data.days,
        budget: data.budget,
        travelType: data.travelType,
        interests: data.interests || [],
        itinerary: data.itinerary || [],
        weather: data.weather || null,
        bestTimeToVisit: data.bestTimeToVisit || '',
        overallEstimatedBudget: data.overallEstimatedBudget || '',
        travelTips: data.travelTips || [],
        recommendedHotels: data.recommendedHotels || [],
        createdAt: data.createdAt
      });
    });

    return trips.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }
};

/**
 * Delete a saved trip from Cloud Firestore
 */
export const deleteTripFromFirestore = async (tripId: string): Promise<void> => {
  if (!tripId) return;
  const docRef = doc(db, TRIPS_COLLECTION, tripId);
  await deleteDoc(docRef);
};
