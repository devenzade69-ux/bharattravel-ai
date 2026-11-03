import React, { useState } from 'react';
import { BudgetLevel, InterestType, TravelType, TripFormInputs } from '../../types/trip';

interface TripFormProps {
  onGenerate: (inputs: TripFormInputs) => void;
  loading: boolean;
}

const BUDGET_OPTIONS: { label: string; value: BudgetLevel; description: string }[] = [
  { label: 'Low (Budget)', value: 'Low', description: 'Hostels, local transport, street food' },
  { label: 'Medium (Standard)', value: 'Medium', description: '3-star hotels, cabs, popular restaurants' },
  { label: 'High (Luxury)', value: 'Luxury' as any, description: '5-star resorts, private travel, fine dining' },
];

// Map 'Luxury' to 'High' if needed
const B_LEVELS: BudgetLevel[] = ['Low', 'Medium', 'High'];

const TRAVEL_TYPES: { label: string; value: TravelType; icon: string }[] = [
  { label: 'Solo', value: 'Solo', icon: 'person' },
  { label: 'Family', value: 'Family', icon: 'family_restroom' },
  { label: 'Friends', value: 'Friends', icon: 'group' },
  { label: 'Couple', value: 'Couple', icon: 'favorite' },
];

const INTEREST_LIST: InterestType[] = [
  'Adventure',
  'Nature',
  'Food',
  'History',
  'Shopping',
  'Beaches',
  'Spiritual',
];

export const TripForm: React.FC<TripFormProps> = ({ onGenerate, loading }) => {
  const [destination, setDestination] = useState('Udaipur, Rajasthan');
  const [days, setDays] = useState<number>(3);
  const [budget, setBudget] = useState<BudgetLevel>('Medium');
  const [travelType, setTravelType] = useState<TravelType>('Solo');
  const [interests, setInterests] = useState<InterestType[]>(['History', 'Food']);
  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleInterest = (interest: InterestType) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!destination.trim()) {
      setValidationError('Please enter a destination in India.');
      return;
    }

    if (!days || days < 1 || days > 30) {
      setValidationError('Number of days must be between 1 and 30.');
      return;
    }

    if (!budget) {
      setValidationError('Please select a budget level.');
      return;
    }

    if (!travelType) {
      setValidationError('Please select a travel type.');
      return;
    }

    onGenerate({
      destination: destination.trim(),
      days: Number(days),
      budget,
      travelType,
      interests,
    });
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-card p-6 custom-shadow sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Trip Parameters
        </h2>
        <span className="material-symbols-outlined text-primary text-2xl" data-icon="tune">
          tune
        </span>
      </div>

      {validationError && (
        <div className="mb-6 p-3 bg-error-container text-on-error-container text-body-sm rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-lg" data-icon="error">
            error
          </span>
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Field */}
        <div className="space-y-2">
          <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold">
            Destination in India *
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="location_on">
              location_on
            </span>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Udaipur, Goa, Manali, Varanasi"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md bg-transparent"
            />
          </div>
        </div>

        {/* Duration (Days) */}
        <div className="space-y-2">
          <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold">
            Duration (1 - 30 Days) *
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="calendar_today">
              calendar_today
            </span>
            <input
              type="number"
              min={1}
              max={30}
              required
              value={days}
              onChange={(e) => setDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-body-md bg-transparent"
            />
          </div>
        </div>

        {/* Budget Selector */}
        <div className="space-y-2">
          <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold">
            Budget Tier *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {B_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setBudget(level)}
                className={`py-2.5 px-3 rounded-xl border font-label-lg text-label-lg transition-all cursor-pointer text-center ${
                  budget === level
                    ? 'border-primary bg-secondary-container text-primary font-bold shadow-sm'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Type Chips */}
        <div className="space-y-2">
          <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold">
            Travel Type *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TRAVEL_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setTravelType(type.value)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border font-label-lg text-label-lg transition-all cursor-pointer ${
                  travelType === type.value
                    ? 'border-primary bg-secondary-container text-primary font-bold shadow-sm'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary'
                }`}
              >
                <span className="material-symbols-outlined text-lg" data-icon={type.icon}>
                  {type.icon}
                </span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interests Multi-select Chips */}
        <div className="space-y-2">
          <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold">
            Interests (Select multiple)
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_LIST.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selected
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant border-outline-variant hover:border-primary'
                  }`}
                >
                  {selected ? '✓ ' : '+ '}
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary hover:bg-primary-container text-white rounded-xl font-headline-md text-body-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer font-bold disabled:opacity-50 mt-4"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Trip...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined" data-icon="auto_awesome">
                auto_awesome
              </span>
              <span>Generate Trip</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
