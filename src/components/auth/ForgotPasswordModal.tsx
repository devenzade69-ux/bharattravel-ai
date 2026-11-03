import React, { useState } from 'react';
import { resetPasswordEmail, getAuthErrorMessage } from '../../services/auth';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialEmail = ''
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await resetPasswordEmail(email);
      setSuccessMessage('Password reset link sent! Please check your email inbox.');
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-margin-mobile">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-8 rounded-card tonal-elevation-2 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors p-1"
          aria-label="Close Modal"
        >
          <span className="material-symbols-outlined text-2xl" data-icon="close">
            close
          </span>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-2xl" data-icon="lock_reset">
              lock_reset
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">Reset Password</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container text-body-sm rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-lg" data-icon="error">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-secondary-container text-primary text-body-sm rounded-xl flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-primary text-lg" data-icon="check_circle">
              check_circle
            </span>
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-label-lg text-label-lg text-on-surface" htmlFor="reset-email">
              Email Address
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="mail">
                mail
              </span>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-12 pr-4 py-3 bg-transparent border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-white font-headline-md text-body-md rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="font-label-lg text-label-lg text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
