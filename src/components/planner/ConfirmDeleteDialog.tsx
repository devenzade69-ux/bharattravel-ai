import React from 'react';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  destination: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  destination,
  onConfirm,
  onCancel,
  loading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-margin-mobile">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-8 rounded-card tonal-elevation-2 relative animate-in fade-in zoom-in duration-200">
        <div className="w-12 h-12 bg-error-container text-error rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-2xl" data-icon="delete_forever">
            delete_forever
          </span>
        </div>

        <div className="text-center mb-6">
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">
            Delete Trip Itinerary?
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Are you sure you want to delete your saved trip to <strong>{destination}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 border border-outline-variant rounded-xl font-label-lg font-bold text-on-surface hover:bg-surface-container transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 bg-error text-on-error rounded-xl font-label-lg font-bold hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
