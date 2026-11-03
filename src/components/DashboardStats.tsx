import React from 'react';
import { GeneratedTrip } from '../types/trip';

interface DashboardStatsProps {
  trips: GeneratedTrip[];
  loading?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ trips, loading = false }) => {
  const totalTrips = trips.length;
  
  // Calculate Most Visited / Saved Destination
  const mostVisited = React.useMemo(() => {
    if (trips.length === 0) return 'N/A';
    const counts: Record<string, number> = {};
    trips.forEach((t) => {
      counts[t.destination] = (counts[t.destination] || 0) + 1;
    });
    let top = trips[0].destination;
    let max = 0;
    Object.entries(counts).forEach(([dest, cnt]) => {
      if (cnt > max) {
        max = cnt;
        top = dest;
      }
    });
    return top;
  }, [trips]);

  // Compute Recent Trip
  const recentTrip = trips.length > 0 ? trips[0] : null;

  // Compute Upcoming / Active itineraries count
  const upcomingTripsCount = React.useMemo(() => {
    return trips.filter((t) => t.days >= 3).length;
  }, [trips]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow animate-pulse space-y-3">
            <div className="w-10 h-10 bg-outline-variant/20 rounded-xl"></div>
            <div className="h-4 bg-outline-variant/20 rounded w-1/2"></div>
            <div className="h-7 bg-outline-variant/30 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Trips */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
        <div className="w-12 h-12 bg-primary-fixed text-primary rounded-2xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl" data-icon="flight_takeoff">
            flight_takeoff
          </span>
        </div>
        <div>
          <span className="text-xs text-outline font-semibold uppercase tracking-wider block">
            Total Trips
          </span>
          <span className="text-2xl font-extrabold text-on-surface">{totalTrips}</span>
          <span className="text-xs text-primary font-medium block">Saved Itineraries</span>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl" data-icon="event_available">
            event_available
          </span>
        </div>
        <div>
          <span className="text-xs text-outline font-semibold uppercase tracking-wider block">
            Upcoming Trips
          </span>
          <span className="text-2xl font-extrabold text-on-surface">{upcomingTripsCount}</span>
          <span className="text-xs text-emerald-600 font-medium block">Multi-day Plans</span>
        </div>
      </div>

      {/* Most Visited Destination */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
        <div className="w-12 h-12 bg-secondary-container text-primary rounded-2xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl" data-icon="location_on">
            location_on
          </span>
        </div>
        <div>
          <span className="text-xs text-outline font-semibold uppercase tracking-wider block">
            Most Saved Place
          </span>
          <span className="text-lg font-bold text-on-surface block truncate max-w-[140px]" title={mostVisited}>
            {mostVisited}
          </span>
          <span className="text-xs text-secondary font-medium block">Top Preference</span>
        </div>
      </div>

      {/* Recent Trip */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
        <div className="w-12 h-12 bg-tertiary-fixed text-tertiary rounded-2xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl" data-icon="history">
            history
          </span>
        </div>
        <div>
          <span className="text-xs text-outline font-semibold uppercase tracking-wider block">
            Recent Trip
          </span>
          <span className="text-lg font-bold text-on-surface block truncate max-w-[140px]" title={recentTrip?.destination || 'None'}>
            {recentTrip ? recentTrip.destination : 'None'}
          </span>
          <span className="text-xs text-tertiary font-medium block">
            {recentTrip ? `${recentTrip.days} Days` : 'Plan a trip'}
          </span>
        </div>
      </div>
    </div>
  );
};
