import React from 'react';
import { GeneratedTrip } from '../../types/trip';
import { TripResult } from './TripResult';

interface TripDetailsModalProps {
  trip: GeneratedTrip | null;
  onClose: () => void;
}

export const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ trip, onClose }) => {
  if (!trip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-margin-mobile md:p-8 overflow-y-auto">
      <div className="w-full max-w-4xl bg-surface dark:bg-on-surface border border-outline-variant/30 rounded-card p-6 md:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface cursor-pointer shadow-md"
          aria-label="Close Itinerary Modal"
        >
          <span className="material-symbols-outlined text-2xl" data-icon="close">
            close
          </span>
        </button>

        <TripResult trip={trip} weather={trip.weather} />
      </div>
    </div>
  );
};
