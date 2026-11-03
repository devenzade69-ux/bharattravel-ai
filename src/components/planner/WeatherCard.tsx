import React from 'react';
import { WeatherData } from '../../types';

interface WeatherCardProps {
  destination: string;
  weather: WeatherData | null;
  loading: boolean;
  bestTimeToVisit?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  destination,
  weather,
  loading,
  bestTimeToVisit = 'October to March'
}) => {

  if (loading) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 md:p-8 custom-shadow flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 rounded-2xl bg-outline-variant/20 shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 w-36 bg-outline-variant/30 rounded"></div>
            <div className="h-8 w-48 bg-outline-variant/30 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary font-semibold">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-body-sm">Fetching Weather...</span>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const displayCity = weather.cityName || destination;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 md:p-8 custom-shadow relative overflow-hidden transition-all space-y-4">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-fixed opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* Warning banner if weather API encountered an issue */}
      {weather.error && (
        <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 text-xs rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-600 text-base" data-icon="info">
            info
          </span>
          <span>{weather.error}</span>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: City & Temperature */}
        <div className="flex items-center gap-4">
          {weather.weatherIcon ? (
            <img
              src={weather.weatherIcon}
              alt={weather.weatherDescription || weather.weatherCondition}
              className="w-16 h-16 object-contain bg-primary-fixed/30 rounded-2xl p-1 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl" data-icon="wb_sunny">
                wb_sunny
              </span>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-body-md font-bold text-primary flex items-center gap-1">
                📍 {displayCity}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl md:text-4xl font-extrabold text-on-surface">
                🌡 {weather.temperature}°C
              </span>
              {weather.feelsLike !== undefined && (
                <span className="text-body-sm font-medium text-outline">
                  (Feels like {weather.feelsLike}°C)
                </span>
              )}
            </div>

            <p className="text-body-sm font-semibold text-on-surface-variant capitalize mt-0.5">
              ☁ {weather.weatherCondition} — {weather.weatherDescription}
            </p>
          </div>
        </div>

        {/* Right Side: Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 border-t lg:border-t-0 lg:border-l border-outline-variant/30 pt-4 lg:pt-0 lg:pl-6">
          {/* Humidity */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="material-symbols-outlined text-sky-600 text-xl mb-1" data-icon="humidity_percentage">
              humidity_percentage
            </span>
            <span className="text-xs text-outline font-medium">💧 Humidity</span>
            <span className="text-body-md font-bold text-on-surface">{weather.humidity}%</span>
          </div>

          {/* Wind Speed */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="material-symbols-outlined text-indigo-600 text-xl mb-1" data-icon="air">
              air
            </span>
            <span className="text-xs text-outline font-medium">💨 Wind Speed</span>
            <span className="text-body-md font-bold text-on-surface">{weather.windSpeed} km/h</span>
          </div>

          {/* Best Time to Visit */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="material-symbols-outlined text-amber-600 text-xl mb-1" data-icon="calendar_month">
              calendar_month
            </span>
            <span className="text-xs text-outline font-medium">🗓️ Best Season</span>
            <span className="text-xs md:text-body-sm font-bold text-on-surface leading-tight">
              {bestTimeToVisit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
