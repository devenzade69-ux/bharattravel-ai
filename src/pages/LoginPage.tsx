import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuthErrorMessage } from '../services/auth';
import { ForgotPasswordModal } from '../components/auth/ForgotPasswordModal';
import { useToast } from '../components/ToastProvider';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/plan';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      showToast('Login successful! Welcome back.', 'success');
      const from = (location.state as any)?.from?.pathname || '/plan';
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = getAuthErrorMessage(err);
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-mesh-blur px-margin-mobile py-12 relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Subtle Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary-fixed opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary-fixed opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card matching Stitch UI */}
      <div className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant p-base md:p-gutter rounded-card elevation-2 z-10">
        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2 font-bold">
            Welcome Back
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Access your AI-powered travel dashboard
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

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="login-email">
              Email Address
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="mail">
                mail
              </span>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                aria-label="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-transparent border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="login-password">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="font-label-md text-label-md text-primary hover:underline transition-all cursor-pointer font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="lock">
                lock
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                aria-label="Password"
                className="w-full pl-12 pr-12 py-4 bg-transparent border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors p-1"
                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              >
                <span className="material-symbols-outlined text-xl" data-icon={showPassword ? 'visibility_off' : 'visibility'}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-on-primary font-headline-md text-body-lg rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] elevation-2 font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Sign Up Prompt */}
        <div className="text-center mt-8 pt-6 border-t border-outline-variant/30">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        initialEmail={email}
      />
    </div>
  );
};

export default LoginPage;
