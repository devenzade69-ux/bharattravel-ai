import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserProfileData, getAuthErrorMessage } from '../../services/auth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, userProfile, refreshProfile } = useAuth();

  const [name, setName] = useState(userProfile?.name || user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL || user?.photoURL || '');
  const [baseCity, setBaseCity] = useState(userProfile?.baseCity || 'New Delhi, IN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Full Name is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateUserProfileData(user.uid, {
        name: name.trim(),
        photoURL: photoURL.trim(),
        baseCity: baseCity.trim()
      });
      await refreshProfile();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-margin-mobile">
      <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant p-8 rounded-card tonal-elevation-2 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors p-1 cursor-pointer"
          aria-label="Close Modal"
        >
          <span className="material-symbols-outlined text-2xl" data-icon="close">
            close
          </span>
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
          <div className="w-10 h-10 bg-primary-fixed rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl" data-icon="edit">
              edit
            </span>
          </div>
          <div>
            <h2 className="font-headline-md text-xl font-bold text-on-surface">Edit Profile</h2>
            <p className="text-xs text-on-surface-variant">Update your personal details & avatar</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container text-body-sm rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-lg" data-icon="error">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Choice */}
          <div className="space-y-2">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold">
              Profile Photo / Avatar
            </label>
            <div className="flex items-center gap-3 mb-3">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xl border-2 border-primary">
                  <span className="material-symbols-outlined text-3xl" data-icon="account_circle">
                    account_circle
                  </span>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Paste Image URL or select below"
                  className="w-full px-3 py-2 border border-outline-variant rounded-xl text-body-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-outline font-medium">Suggested Avatars:</span>
              <div className="flex gap-2">
                {DEFAULT_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotoURL(url)}
                    className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant hover:border-primary focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="edit-name">
              Full Name *
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="person">
                person
              </span>
              <input
                id="edit-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arjun Sharma"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
              />
            </div>
          </div>

          {/* Base City */}
          <div className="space-y-2">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="edit-city">
              Base City / Location
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="location_on">
                location_on
              </span>
              <input
                id="edit-city"
                type="text"
                value={baseCity}
                onChange={(e) => setBaseCity(e.target.value)}
                placeholder="e.g. New Delhi, IN"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 border border-outline-variant rounded-xl font-label-lg font-bold text-on-surface hover:bg-surface-container transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-primary text-white rounded-xl font-label-lg font-bold hover:bg-primary-container transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
