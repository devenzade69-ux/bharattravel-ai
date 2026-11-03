import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuthErrorMessage } from '../services/auth';
import { useToast } from '../components/ToastProvider';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/plan', { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validations
    if (!fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register(email.trim(), password, fullName.trim());
      showToast('Account created successfully! Welcome to BharatTravel AI.', 'success');
      navigate('/plan', { replace: true });
    } catch (err: any) {
      const msg = getAuthErrorMessage(err);
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center relative overflow-hidden px-margin-mobile py-12 min-h-[calc(100vh-4rem)]">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-mesh-blur" />

      {/* Registration Card matching Stitch UI */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white dark:bg-surface-container-lowest rounded-card tonal-elevation-2 p-8 border border-outline-variant/30 backdrop-blur-sm">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2 font-bold">
              Create Account
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Start your AI-powered journey across India today.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container text-body-sm rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-xl shrink-0" data-icon="error">
                error
              </span>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleRegister}>
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold px-1" htmlFor="reg-name">
                Full Name
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="person">
                  person
                </span>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Arjun Sharma"
                  aria-label="Full Name"
                  className="w-full h-[56px] pl-12 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold px-1" htmlFor="reg-email">
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="mail">
                  mail
                </span>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun.s@example.com"
                  aria-label="Email Address"
                  className="w-full h-[56px] pl-12 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold px-1" htmlFor="reg-password">
                Password
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="lock">
                  lock
                </span>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  aria-label="Password"
                  className="w-full h-[56px] pl-12 pr-[56px] rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors p-1"
                  aria-label="Toggle Password Visibility"
                >
                  <span className="material-symbols-outlined text-xl" data-icon={showPassword ? 'visibility_off' : 'visibility'}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block font-label-lg text-label-lg text-on-surface-variant font-semibold px-1" htmlFor="reg-confirm-password">
                Confirm Password
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="lock_clock">
                  lock_clock
                </span>
                <input
                  id="reg-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  aria-label="Confirm Password"
                  className="w-full h-[56px] pl-12 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] bg-primary text-white rounded-full font-label-lg text-label-lg font-bold hover:bg-primary-container transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline transition-all">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
