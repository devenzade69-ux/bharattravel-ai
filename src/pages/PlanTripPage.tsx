import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripForm } from '../components/planner/TripForm';
import { TripResult } from '../components/planner/TripResult';
import { GeneratedTrip, TripFormInputs } from '../types/trip';
import { generateTripItinerary } from '../services/groq';
import { getWeather } from '../services/weather';
import { saveTripToFirestore } from '../services/tripService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ToastProvider';
import { WeatherData } from '../types';

export const PlanTripPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [trip, setTrip] = useState<GeneratedTrip | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTrip = async (inputs: TripFormInputs) => {
    setLoading(true);
    setWeatherLoading(true);
    setError(null);

    // Scroll smoothly to top of main area
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Fetch AI Itinerary via Groq AI and Live Destination Weather in parallel
      const [itineraryResult, weatherResult] = await Promise.all([
        generateTripItinerary(inputs),
        getWeather(inputs.destination).catch((err) => {
          console.warn('Weather fetch error:', err);
          return null;
        })
      ]);

      const finalTrip: GeneratedTrip = {
        ...itineraryResult,
        weather: weatherResult || undefined
      };

      setTrip(finalTrip);
      setWeather(weatherResult);
      showToast(`Trip to ${inputs.destination} generated successfully!`, 'success');
    } catch (err: any) {
      const msg = err?.message || 'Failed to generate itinerary. Please try again.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
      setWeatherLoading(false);
    }
  };

  const handleSaveTrip = async (tripToSave: GeneratedTrip) => {
    if (!user) {
      showToast('Please login to save trips.', 'info');
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      await saveTripToFirestore(tripToSave, user.uid);
      showToast('Trip Saved Successfully! Access it anytime in Saved Trips.', 'success');
    } catch (err: any) {
      const msg = err?.message || 'Failed to save trip. Please check your internet connection.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 min-h-[calc(100vh-4rem)] relative">
      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Left Sidebar: Form */}
        <aside className="w-full lg:w-[380px] shrink-0">
          <TripForm onGenerate={handleGenerateTrip} loading={loading} />
        </aside>

        {/* Main Area: Results & States */}
        <section className="flex-1 space-y-6">
          {/* AI Loader */}
          {loading && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-card p-12 custom-shadow text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Generating your Groq AI trip & live weather...
                </h3>
                <p className="text-body-md text-on-surface-variant max-w-md mx-auto">
                  Our Groq AI model is curating places to visit, food recommendations, and live climate details for your destination.
                </p>
              </div>
              <div className="w-full max-w-sm h-1.5 bg-secondary-container rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-primary animate-[pulse_1.5s_infinite] w-full" />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-error-container text-on-error-container border border-error/20 rounded-card p-6 md:p-8 custom-shadow flex items-start gap-4">
              <span className="material-symbols-outlined text-error text-3xl shrink-0" data-icon="error_med">
                error_med
              </span>
              <div className="space-y-2">
                <h3 className="font-headline-md text-lg font-bold text-on-error-container">
                  Trip Planner Notification
                </h3>
                <p className="text-body-md">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 bg-error text-on-error rounded-xl font-label-lg font-bold hover:opacity-90 transition-opacity mt-2 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Result View */}
          {trip && !loading && (
            <TripResult 
              trip={trip} 
              weather={weather || trip.weather || null}
              weatherLoading={weatherLoading}
              onSave={handleSaveTrip}
              isSaving={isSaving}
            />
          )}

          {/* Initial Blank / Empty State */}
          {!trip && !loading && !error && (
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-card p-12 custom-shadow text-center space-y-6 flex flex-col items-center justify-center min-h-[450px]">
              <div className="w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl" data-icon="explore">
                  explore
                </span>
              </div>
              <div className="max-w-md space-y-2">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">
                  Ready for your Indian Journey?
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Select your destination, duration, budget, and travel style on the left form and click <strong>Generate Trip</strong> to get a custom AI itinerary + live weather powered by Groq.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="px-4 py-2 bg-surface-container rounded-full text-xs font-semibold text-secondary">
                  🏰 Rajasthan Heritage
                </span>
                <span className="px-4 py-2 bg-surface-container rounded-full text-xs font-semibold text-secondary">
                  🌴 Goa Beaches
                </span>
                <span className="px-4 py-2 bg-surface-container rounded-full text-xs font-semibold text-secondary">
                  🏔️ Himachal Adventure
                </span>
                <span className="px-4 py-2 bg-surface-container rounded-full text-xs font-semibold text-secondary">
                  🛕 Varanasi Spiritual
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PlanTripPage;
