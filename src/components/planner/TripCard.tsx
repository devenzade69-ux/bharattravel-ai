import React, { useState } from 'react';
import { ItineraryDay } from '../../types/trip';

interface TripCardProps {
  dayData: ItineraryDay;
  isExpandedInitial?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ dayData, isExpandedInitial = false }) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedInitial);

  const slots = [
    { type: 'Morning', data: dayData.morning, icon: 'wb_sunny', color: 'text-amber-600', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { type: 'Afternoon', data: dayData.afternoon, icon: 'wb_twilight', color: 'text-sky-600', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200' },
    { type: 'Evening', data: dayData.evening, icon: 'nights_stay', color: 'text-indigo-600', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  ].filter(s => s.data && (s.data.title || s.data.description));

  return (
    <div className="bg-white dark:bg-surface-container-lowest rounded-card overflow-hidden custom-shadow border border-outline-variant/30 transition-all">
      {/* Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-surface-container-low/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xl shrink-0">
            {String(dayData.day).padStart(2, '0')}
          </div>
          <div>
            <h3 className="font-headline-md text-xl md:text-headline-md text-on-surface font-bold">
              {dayData.title}
            </h3>
            <p className="text-label-md text-outline font-medium">
              Day {dayData.day} • Daily Budget ~ {dayData.estimatedDailyBudget}
            </p>
          </div>
        </div>

        <button 
          className="text-primary font-label-lg flex items-center gap-1 hover:underline cursor-pointer"
          aria-label={isExpanded ? "Collapse Details" : "View Details"}
        >
          <span className="hidden sm:inline font-semibold">{isExpanded ? 'Hide Details' : 'View Details'}</span>
          <span 
            className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            data-icon="keyboard_arrow_down"
          >
            keyboard_arrow_down
          </span>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-8 md:px-8 border-t border-outline-variant/10 pt-6 space-y-8 animate-in fade-in duration-200">
          {/* Stepper Timeline */}
          <div className="space-y-8 relative">
            {slots.map((slot, index) => {
              const isLast = index === slots.length - 1;
              return (
                <div key={slot.type} className={`relative pl-8 md:pl-10 ${isLast ? 'last-stepper' : ''}`}>
                  {!isLast && <div className="stepper-line"></div>}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm z-10"></div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-label-lg font-label-lg px-3 py-1 rounded-full border flex items-center gap-1 ${slot.badgeBg}`}>
                        <span className={`material-symbols-outlined text-sm ${slot.color}`} data-icon={slot.icon}>
                          {slot.icon}
                        </span>
                        <span>{slot.type}</span>
                      </span>
                    </div>

                    <h4 className="font-headline-md text-body-lg font-bold text-on-surface">
                      {slot.data.title}
                    </h4>

                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      {slot.data.description}
                    </p>

                    {/* Places to visit badges */}
                    {slot.data.placesToVisit && slot.data.placesToVisit.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {slot.data.placesToVisit.map((place, pIdx) => (
                          <span 
                            key={pIdx}
                            className="text-label-md bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full border border-outline-variant/20 font-medium flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm text-primary" data-icon="place">
                              place
                            </span>
                            <span>{place}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Recommended Food for slot */}
                    {slot.data.recommendedFood && (
                      <div className="text-body-sm text-secondary bg-surface-container-low p-3 rounded-xl flex items-center gap-2 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-tertiary" data-icon="restaurant">
                          restaurant
                        </span>
                        <span><strong>Food Suggestion:</strong> {slot.data.recommendedFood}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Food Recommendations Footer */}
          {dayData.foodRecommendations && dayData.foodRecommendations.length > 0 && (
            <div className="p-4 bg-tertiary-fixed/30 rounded-2xl border border-tertiary/10 flex flex-col sm:flex-row sm:items-center gap-3 mt-6">
              <div className="flex items-center gap-2 text-tertiary font-bold shrink-0">
                <span className="material-symbols-outlined" data-icon="dinner_dining">
                  dinner_dining
                </span>
                <span>Must-Try Local Flavors:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {dayData.foodRecommendations.map((food, fIdx) => (
                  <span 
                    key={fIdx}
                    className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-on-surface border border-outline-variant/30"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
