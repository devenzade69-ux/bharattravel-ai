import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GeneratedTrip } from '../types/trip';
import { getUserSavedTrips, deleteTripFromFirestore } from '../services/tripService';
import { TripDetailsModal } from '../components/planner/TripDetailsModal';
import { ConfirmDeleteDialog } from '../components/planner/ConfirmDeleteDialog';
import { SearchBar } from '../components/SearchBar';
import { SortDropdown, SortOption } from '../components/SortDropdown';
import { DashboardStats } from '../components/DashboardStats';
import { SkeletonCard } from '../components/SkeletonCard';
import { useToast } from '../components/ToastProvider';

export const SavedTripsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [savedTrips, setSavedTrips] = useState<GeneratedTrip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [error, setError] = useState<string | null>(null);

  // Modal & Dialog states
  const [selectedTrip, setSelectedTrip] = useState<GeneratedTrip | null>(null);
  const [tripToDelete, setTripToDelete] = useState<GeneratedTrip | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchTrips = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const trips = await getUserSavedTrips(user.uid);
      setSavedTrips(trips);
    } catch (err: any) {
      console.error('Error fetching saved trips:', err);
      setError('Failed to load saved trips. Please check your network connection.');
      showToast('Error loading trips.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  const handleDeleteConfirm = async () => {
    if (!tripToDelete || !tripToDelete.id) return;
    setIsDeleting(true);
    try {
      await deleteTripFromFirestore(tripToDelete.id);
      showToast(`Trip to ${tripToDelete.destination} deleted successfully!`, 'info');
      setTripToDelete(null);
      await fetchTrips(); // Refresh list automatically
    } catch (err: any) {
      console.error('Error deleting trip:', err);
      setError('Failed to delete trip. Please try again.');
      showToast('Failed to delete trip.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter and Sort Logic
  const processedTrips = useMemo(() => {
    let result = [...savedTrips];

    // Search filter (Destination, Travel Type, Budget)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.destination.toLowerCase().includes(q) ||
          t.travelType.toLowerCase().includes(q) ||
          t.budget.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      }
      if (sortBy === 'oldest') {
        return (a.createdAt || '').localeCompare(b.createdAt || '');
      }
      if (sortBy === 'alphabetical') {
        return a.destination.localeCompare(b.destination);
      }
      if (sortBy === 'budget') {
        const order: Record<string, number> = { Low: 1, Medium: 2, High: 3, Luxury: 3 };
        return (order[a.budget] || 1) - (order[b.budget] || 1);
      }
      return 0;
    });

    return result;
  }, [savedTrips, searchQuery, sortBy]);

  return (
    <main className="flex-grow container mx-auto px-margin-mobile md:px-margin-desktop py-12 max-w-container-max min-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2 font-bold">
          Saved Trips & Dashboard
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Access all your AI-generated Indian adventures. Review your itineraries, manage travel dates, or download PDF guides.
        </p>
      </div>

      {/* Dashboard Statistics Component */}
      <DashboardStats trips={savedTrips} loading={loading} />

      {/* Error Notification */}
      {error && (
        <div className="mb-6 p-4 bg-error-container text-on-error-container border border-error/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error" data-icon="error">
              error
            </span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-xs font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter, Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="w-full sm:w-auto shrink-0">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Skeleton Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Empty State */}
      {!loading && processedTrips.length === 0 && (
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-card p-12 custom-shadow text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined text-4xl" data-icon="luggage">
              luggage
            </span>
          </div>
          <div className="max-w-md space-y-2">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              {searchQuery ? 'No matching trips found' : 'No trips found.'}
            </h2>
            <p className="text-body-md text-on-surface-variant">
              {searchQuery
                ? `No saved trip matches "${searchQuery}". Try a different keyword or filter.`
                : 'You haven\'t saved any AI trip itineraries yet. Create your first journey across India now!'}
            </p>
          </div>
          <button
            onClick={() => navigate('/plan')}
            className="bg-primary text-white px-8 py-3.5 rounded-full font-headline-md text-body-md hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined" data-icon="add">
              add
            </span>
            <span>Plan Your First Trip</span>
          </button>
        </div>
      )}

      {/* Trip Cards Grid */}
      {!loading && processedTrips.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {processedTrips.map((tripItem) => (
            <div
              key={tripItem.id}
              className="bg-white dark:bg-surface-container-lowest rounded-card overflow-hidden trip-card-shadow flex flex-col group border border-outline-variant/30 hover:-translate-y-1 transition-transform"
            >
              {/* Card Banner / Header */}
              <div className="relative h-48 bg-primary-fixed/40 overflow-hidden flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="relative z-20 text-white">
                  <span className="text-xs uppercase tracking-wider font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 mb-2 inline-block">
                    {tripItem.travelType} Trip
                  </span>
                  <h3 className="font-headline-md text-2xl font-bold line-clamp-1">
                    {tripItem.destination}
                  </h3>
                </div>

                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary" data-icon="calendar_today">
                    calendar_today
                  </span>
                  <span className="text-label-md font-label-md text-on-surface font-bold">
                    {tripItem.days} Days
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-md text-lg text-on-surface font-bold">
                      {tripItem.destination}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-container text-primary">
                      {tripItem.budget}
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {tripItem.itinerary && tripItem.itinerary.length > 0
                      ? tripItem.itinerary[0].title
                      : `${tripItem.days}-day custom itinerary for ${tripItem.travelType}`}
                  </p>

                  <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-outline font-medium">
                    <span>
                      Created: {tripItem.createdAt ? new Date(tripItem.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                    </span>
                    <span>{tripItem.itinerary ? tripItem.itinerary.length : tripItem.days} Days</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedTrip(tripItem)}
                    className="flex-grow bg-primary text-white py-3 rounded-xl font-label-lg font-bold hover:bg-primary-container transition-colors active:opacity-90 cursor-pointer text-center"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setTripToDelete(tripItem)}
                    className="p-3 rounded-xl border border-outline-variant text-error hover:bg-error-container/30 transition-colors active:opacity-90 cursor-pointer shrink-0"
                    title="Delete Trip"
                    aria-label={`Delete trip to ${tripItem.destination}`}
                  >
                    <span className="material-symbols-outlined text-xl" data-icon="delete">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Plan a New Trip Card */}
          <div
            onClick={() => navigate('/plan')}
            className="bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-card flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary transition-all hover:bg-white min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
              <span className="material-symbols-outlined text-3xl" data-icon="add">
                add
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
              Plan a New Trip
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              Let our AI craft your next perfect Indian journey.
            </p>
          </div>
        </div>
      )}

      {/* View Itinerary Modal */}
      <TripDetailsModal
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={Boolean(tripToDelete)}
        destination={tripToDelete?.destination || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTripToDelete(null)}
        loading={isDeleting}
      />
    </main>
  );
};

export default SavedTripsPage;
