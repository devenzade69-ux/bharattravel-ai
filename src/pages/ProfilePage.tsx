import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getUserSavedTrips } from '../services/tripService';
import { GeneratedTrip } from '../types/trip';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { useToast } from '../components/ToastProvider';

export const ProfilePage: React.FC = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [savedTrips, setSavedTrips] = useState<GeneratedTrip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const fetchProfileStats = async () => {
    if (user) {
      setLoading(true);
      try {
        const trips = await getUserSavedTrips(user.uid);
        setSavedTrips(trips);
      } catch (err) {
        console.error('Error fetching profile stats:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProfileStats();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logout Successful', 'info');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      showToast('Logout failed.', 'error');
    }
  };

  const handleProfileSuccess = () => {
    showToast('Profile Updated Successfully!', 'success');
    fetchProfileStats();
  };

  // Profile data derivations
  const displayName = userProfile?.name || user?.displayName || 'Indian Traveler';
  const email = userProfile?.email || user?.email || 'N/A';
  const avatarUrl = userProfile?.photoURL || user?.photoURL;
  const baseCity = userProfile?.baseCity || 'New Delhi, IN';
  const totalTrips = savedTrips.length;

  // Compute Favorite Destination dynamically
  const favoriteDestination = React.useMemo(() => {
    if (savedTrips.length === 0) return 'Rajasthan / Goa';
    const counts: Record<string, number> = {};
    savedTrips.forEach((t) => {
      counts[t.destination] = (counts[t.destination] || 0) + 1;
    });
    let topDest = savedTrips[0].destination;
    let maxCount = 0;
    Object.entries(counts).forEach(([dest, cnt]) => {
      if (cnt > maxCount) {
        maxCount = cnt;
        topDest = dest;
      }
    });
    return topDest;
  }, [savedTrips]);

  // Compute Recent Trip
  const recentTrip = savedTrips.length > 0 ? savedTrips[0] : null;

  // Format account created date
  const accountCreatedDate = React.useMemo(() => {
    if (userProfile?.createdAt) {
      return new Date(userProfile.createdAt).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric'
      });
    }
    if (user?.metadata?.creationTime) {
      return new Date(user.metadata.creationTime).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric'
      });
    }
    return 'July 2024';
  }, [userProfile, user]);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 min-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2 font-bold">
            My Profile
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Manage your travel preferences, profile details, and review your AI trip analytics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-full font-label-lg font-bold hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl" data-icon="edit">
              edit
            </span>
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="border border-outline-variant text-error hover:bg-error-container/20 px-6 py-3 rounded-full font-label-lg font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl" data-icon="logout">
              logout
            </span>
            <span>Logout</span>
          </button>
        </div>
      </section>

      {/* Statistics Cards Header Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Trips */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
          <div className="w-14 h-14 bg-primary-fixed text-primary rounded-2xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl" data-icon="flight_takeoff">
              flight_takeoff
            </span>
          </div>
          <div>
            <span className="text-xs text-outline font-semibold uppercase tracking-wider">
              Total Saved Trips
            </span>
            <p className="text-3xl font-extrabold text-on-surface">
              {loading ? '...' : totalTrips}
            </p>
            <span className="text-xs text-primary font-medium">AI-curated journeys</span>
          </div>
        </div>

        {/* Favorite Destination */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
          <div className="w-14 h-14 bg-secondary-container text-primary rounded-2xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl" data-icon="favorite">
              favorite
            </span>
          </div>
          <div>
            <span className="text-xs text-outline font-semibold uppercase tracking-wider">
              Favorite Destination
            </span>
            <p className="text-xl font-bold text-on-surface truncate max-w-[200px]">
              {loading ? '...' : favoriteDestination}
            </p>
            <span className="text-xs text-secondary font-medium">Top planned location</span>
          </div>
        </div>

        {/* Recent Trip */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-card p-6 custom-shadow flex items-center gap-4">
          <div className="w-14 h-14 bg-tertiary-fixed text-tertiary rounded-2xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl" data-icon="history">
              history
            </span>
          </div>
          <div>
            <span className="text-xs text-outline font-semibold uppercase tracking-wider">
              Recent Trip
            </span>
            <p className="text-xl font-bold text-on-surface truncate max-w-[200px]">
              {loading ? '...' : recentTrip ? recentTrip.destination : 'No trips yet'}
            </p>
            <span className="text-xs text-tertiary font-medium">
              {recentTrip ? `${recentTrip.days} Days • ${recentTrip.budget}` : 'Plan a trip to see history'}
            </span>
          </div>
        </div>
      </section>

      {/* Profile Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: User Identity Card */}
        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-surface-container-lowest rounded-card p-8 tonal-elevation-2 border border-outline-variant/30 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-fixed shadow-md bg-surface-container flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-7xl text-primary" data-icon="account_circle">
                    account_circle
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-container transition-colors cursor-pointer"
                title="Edit Photo"
                aria-label="Edit Profile Photo"
              >
                <span className="material-symbols-outlined text-sm" data-icon="edit">
                  edit
                </span>
              </button>
            </div>

            <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-1">
              {displayName}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              {email}
            </p>

            <div className="w-full space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" data-icon="location_on">
                    location_on
                  </span>
                  <span className="text-label-lg font-label-lg font-semibold">Base City</span>
                </div>
                <span className="text-body-sm font-body-sm text-on-surface-variant font-medium">
                  {baseCity}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" data-icon="calendar_month">
                    calendar_month
                  </span>
                  <span className="text-label-lg font-label-lg font-semibold">Account Created</span>
                </div>
                <span className="text-body-sm font-body-sm text-on-surface-variant font-medium">
                  {accountCreatedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Account Information & Actions */}
        <div className="lg:col-span-8 space-y-gutter">
          <div className="bg-surface-container-lowest rounded-card p-8 tonal-elevation-2 border border-outline-variant/30 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-fixed rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl" data-icon="manage_accounts">
                    manage_accounts
                  </span>
                </div>
                <div>
                  <h2 className="font-headline-md text-xl font-bold text-on-surface">Account Details</h2>
                  <p className="text-xs text-on-surface-variant">Authenticated via Firebase Authentication & Firestore</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-primary font-label-lg hover:underline cursor-pointer flex items-center gap-1 font-bold text-sm"
              >
                <span className="material-symbols-outlined text-sm" data-icon="edit">
                  edit
                </span>
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1">
                <span className="text-xs text-outline font-semibold uppercase">Full Name</span>
                <p className="text-body-md font-bold text-on-surface">{displayName}</p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl space-y-1">
                <span className="text-xs text-outline font-semibold uppercase">Email Address</span>
                <p className="text-body-md font-bold text-on-surface truncate">{email}</p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl space-y-1">
                <span className="text-xs text-outline font-semibold uppercase">User UID</span>
                <p className="text-xs font-mono font-bold text-on-surface-variant truncate">{user?.uid}</p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl space-y-1">
                <span className="text-xs text-outline font-semibold uppercase">Joined Date</span>
                <p className="text-body-md font-bold text-on-surface">{accountCreatedDate}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate('/plan')}
                className="w-full sm:flex-1 bg-primary text-white py-3.5 rounded-xl font-label-lg font-bold hover:bg-primary-container transition-all text-center cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined" data-icon="auto_awesome">
                  auto_awesome
                </span>
                <span>Plan a New Trip</span>
              </button>

              <button
                onClick={() => navigate('/saved-trips')}
                className="w-full sm:flex-1 bg-secondary-container text-primary border border-primary/20 py-3.5 rounded-xl font-label-lg font-bold hover:bg-surface-container-high transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined" data-icon="bookmark">
                  bookmark
                </span>
                <span>View Saved Trips ({totalTrips})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleProfileSuccess}
      />
    </main>
  );
};

export default ProfilePage;
