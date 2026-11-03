import React, { useState } from 'react';
import { GeneratedTrip } from '../../types/trip';
import { WeatherData } from '../../types';
import { TripCard } from './TripCard';
import { WeatherCard } from './WeatherCard';
import { PdfButton } from '../PdfButton';

interface TripResultProps {
  trip: GeneratedTrip;
  weather?: WeatherData | null;
  weatherLoading?: boolean;
  onSave?: (trip: GeneratedTrip) => Promise<void>;
  isSaving?: boolean;
}

export const TripResult: React.FC<TripResultProps> = ({
  trip,
  weather,
  weatherLoading = false,
  onSave,
  isSaving = false
}) => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      await onSave(trip);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  const activeWeather = weather || trip.weather || null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-card p-6 md:p-8 custom-shadow flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-lg text-xs uppercase tracking-wider font-bold mb-3">
            <span className="material-symbols-outlined text-base" data-icon="auto_awesome">
              auto_awesome
            </span>
            <span>AI Personalised Itinerary</span>
          </div>
          <h1 className="font-headline-xl text-3xl md:text-headline-xl text-on-surface font-bold">
            {trip.destination}
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mt-2">
            A curated {trip.days}-day {trip.travelType} journey designed for a {trip.budget} budget.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-semibold">
              🗓️ {trip.days} Days
            </span>
            <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-semibold">
              💰 {trip.budget} Budget
            </span>
            <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-semibold">
              👥 {trip.travelType}
            </span>
            {trip.bestTimeToVisit && (
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-semibold">
                ☀️ Best Season: {trip.bestTimeToVisit}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Download PDF, Share, Save */}
        <div className="flex items-center flex-wrap gap-3 shrink-0">
          <PdfButton trip={trip} />

          <button
            onClick={handleShare}
            className="p-3 rounded-full border border-outline-variant hover:bg-surface-container transition-all text-on-surface-variant flex items-center justify-center cursor-pointer relative"
            title="Share Itinerary"
            aria-label="Share Itinerary Link"
          >
            <span className="material-symbols-outlined" data-icon="share">
              share
            </span>
            {copiedShare && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap shadow">
                Link Copied!
              </span>
            )}
          </button>

          {onSave && (
            <button
              onClick={handleSave}
              disabled={isSaving || saveSuccess}
              className={`px-6 py-3 rounded-full font-label-lg font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary text-white hover:bg-primary-container'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <span className="material-symbols-outlined text-xl" data-icon="check">
                    check
                  </span>
                  <span>Trip Saved!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl" data-icon="bookmark">
                    bookmark
                  </span>
                  <span>Save Trip</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Weather Card Component (Above Itinerary as required) */}
      <WeatherCard
        destination={trip.destination}
        weather={activeWeather}
        loading={weatherLoading}
        bestTimeToVisit={trip.bestTimeToVisit}
      />

      {/* Summary Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-primary-fixed/80 rounded-card border border-primary/10 custom-shadow">
          <span className="material-symbols-outlined text-primary mb-2 text-2xl" data-icon="payments">
            payments
          </span>
          <h4 className="font-label-lg text-label-lg text-primary mb-1 font-bold">Estimated Total Budget</h4>
          <p className="text-2xl font-bold text-on-primary-fixed">{trip.overallEstimatedBudget || 'Calculated per day'}</p>
          <p className="text-xs text-on-primary-fixed-variant mt-1">Includes stay, food, activities & local travel</p>
        </div>

        <div className="p-6 bg-secondary-fixed/80 rounded-card border border-secondary/10 custom-shadow">
          <span className="material-symbols-outlined text-secondary mb-2 text-2xl" data-icon="lightbulb">
            lightbulb
          </span>
          <h4 className="font-label-lg text-label-lg text-secondary mb-1 font-bold">Key Travel Tip</h4>
          <p className="text-body-md text-on-secondary-fixed font-medium line-clamp-3">
            {trip.travelTips && trip.travelTips.length > 0 ? trip.travelTips[0] : 'Carry valid IDs and local currency cash for market shopping.'}
          </p>
        </div>

        <div className="p-6 bg-tertiary-fixed/80 rounded-card border border-tertiary/10 custom-shadow">
          <span className="material-symbols-outlined text-tertiary mb-2 text-2xl" data-icon="hotel">
            hotel
          </span>
          <h4 className="font-label-lg text-label-lg text-tertiary mb-1 font-bold">Recommended Accommodation</h4>
          <p className="text-body-md text-on-tertiary-fixed font-semibold">
            {trip.recommendedHotels && trip.recommendedHotels.length > 0
              ? trip.recommendedHotels[0].name
              : `${trip.budget} Tier Hotels`}
          </p>
          <p className="text-xs text-on-tertiary-fixed-variant mt-1">
            {trip.recommendedHotels && trip.recommendedHotels.length > 0
              ? `${trip.recommendedHotels[0].address} (${trip.recommendedHotels[0].pricePerNight})`
              : 'Matched to your selected budget tier'}
          </p>
        </div>
      </div>

      {/* Day-Wise Itinerary Cards */}
      <div className="space-y-6">
        <h2 className="font-headline-md text-2xl text-on-surface font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" data-icon="route">
            route
          </span>
          <span>Day-by-Day Detailed Itinerary</span>
        </h2>

        {trip.itinerary && trip.itinerary.map((dayItem, index) => (
          <TripCard
            key={dayItem.day || index + 1}
            dayData={dayItem}
            isExpandedInitial={index === 0}
          />
        ))}
      </div>

      {/* Comprehensive Travel Tips */}
      {trip.travelTips && trip.travelTips.length > 0 && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-card p-6 md:p-8 custom-shadow space-y-4">
          <h3 className="font-headline-md text-headline-md text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl" data-icon="verified_user">
              verified_user
            </span>
            <span>Essential Travel Tips for {trip.destination}</span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trip.travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5" data-icon="check_circle">
                  check_circle
                </span>
                <span className="text-body-md text-on-surface-variant">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
