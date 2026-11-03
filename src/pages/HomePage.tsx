import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE4QiSHpfDMNAdlwsdPmPqTBp_C87F46PHNHyUYl7L1RJvUOqh2QHDtP76cK5EEvmNElBJdMPptM-cvOA9GCSvPfHDK7nzp0_8xAiwhYsovFYsQhsbkJI18iVz1cjrfvbs-rGKxdKs6sFaC_HqVgdDeqtM-vCWsppWOvV4kgyrPuIijq3BjpsKiXjaW8LgD-3Kvq0db99Mi7sjPkr3UJqS1S6lcKr_ut-UxiH6yFmlcjX7mL7yoHX6-A')` 
            }}
          />
          <div className="absolute inset-0 hero-gradient z-10" />
          <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
              <span className="material-symbols-outlined text-[18px]" data-icon="auto_awesome">
                auto_awesome
              </span>
              <span className="font-label-lg text-label-lg uppercase tracking-wider">
                Next-Gen Travel Intelligence
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-headline-xl mb-6 max-w-3xl mx-auto leading-tight font-bold">
              Discover India, Optimized by AI.
            </h1>
            <p className="font-body-lg text-base sm:text-lg md:text-body-lg mb-10 max-w-2xl mx-auto opacity-90">
              Experience the magic of the Indian subcontinent with personalized, data-driven itineraries that adapt to your rhythm, preferences, and local secrets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/plan')}
                className="w-full sm:w-auto bg-primary text-white font-headline-md text-body-md h-[56px] px-10 rounded-full hover:scale-105 transition-transform ambient-shadow flex items-center justify-center gap-2 cursor-pointer font-semibold"
                aria-label="Start Planning Trip"
              >
                Plan Trip
                <span className="material-symbols-outlined" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-white/20 backdrop-blur-md text-white border border-white/30 font-headline-md text-body-md h-[56px] px-10 rounded-full hover:bg-white/30 transition-all cursor-pointer font-semibold"
                aria-label="Login to account"
              >
                Login
              </button>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4 font-bold">
              Why Plan with BharatTravel AI?
            </h2>
            <p className="font-body-md text-body-md text-secondary max-w-xl mx-auto">
              We combine millions of data points with local expertise to create the perfect Indian journey for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Card */}
            <div className="md:col-span-8 glass-card rounded-card p-8 md:p-10 ambient-shadow flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl" data-icon="smart_toy">
                    smart_toy
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 font-semibold">
                  AI Trip Planning
                </h3>
                <p className="font-body-md text-body-md text-secondary mb-6">
                  Our AI learns your travel persona—whether you're a luxury seeker, a solo traveler, or going with family—and crafts minute-by-minute plans just for you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-secondary-fixed rounded-full text-primary font-label-lg">
                    Cultural Immersion
                  </span>
                  <span className="px-4 py-2 bg-secondary-fixed rounded-full text-primary font-label-lg">
                    Adventure Trails
                  </span>
                  <span className="px-4 py-2 bg-secondary-fixed rounded-full text-primary font-label-lg">
                    Luxury Stays
                  </span>
                </div>
              </div>
              <div 
                className="flex-1 w-full h-64 rounded-card overflow-hidden bg-cover bg-center" 
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUCudmQeuD9QsnSdiHAhXsPRUKW5ZZgpZkdBpOWh2Z9A-CFmz4pf0eDYPocsIvn9waMRO7fekGIY8MWmb2aUnwAJx6Pyk41Q87DXvOacZ3_JlPjsjnC2LlLrcM3lRzbA7x1Ky4fZjYUFuUy6tlkxFnxMLYGiUnnr_-6dsmqE39H2kQC6aAnOhWvN6LATmjPbUuLOZgqaDQuYDP5zTJYJtXAId_C9xUYRop0etGARY7HS1x_7w2SC_pfw')`
                }}
              />
            </div>

            {/* Small Card 1: Budget Planning */}
            <div className="md:col-span-4 glass-card rounded-card p-8 md:p-10 ambient-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl" data-icon="account_balance_wallet">
                    account_balance_wallet
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 font-semibold">
                  Budget Planning
                </h3>
                <p className="font-body-md text-body-md text-secondary">
                  Transparent cost estimations for accommodation, food, transport, and activities tailored to your budget tier.
                </p>
              </div>
            </div>

            {/* Small Card 2: Weather Information */}
            <div className="md:col-span-4 glass-card rounded-card p-8 md:p-10 ambient-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl" data-icon="thermostat">
                    thermostat
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 font-semibold">
                  Weather Information
                </h3>
                <p className="font-body-md text-body-md text-secondary">
                  Live OpenWeather integration providing real-time temperature, humidity, wind speed, and weather alerts for your destination.
                </p>
              </div>
            </div>

            {/* Medium Card: Saved Trips */}
            <div className="md:col-span-8 glass-card rounded-card p-8 md:p-10 ambient-shadow flex flex-col justify-center">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl" data-icon="bookmark">
                    bookmark
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2 font-semibold">
                    Saved Trips & Cloud Sync
                  </h3>
                  <p className="font-body-md text-body-md text-secondary">
                    Save all your generated itineraries directly to Firebase Cloud Firestore. Access and manage your travel plans anytime across devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
            <span className="material-symbols-outlined text-[400px]" data-icon="travel_explore">
              travel_explore
            </span>
          </div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-headline-xl mb-6 font-bold">
              Your Indian Odyssey Starts Here
            </h2>
            <p className="font-body-lg text-base sm:text-lg md:text-body-lg mb-10 max-w-2xl mx-auto opacity-80">
              Join thousands of travelers who have transformed their Indian travel experience with BharatTravel AI.
            </p>
            <div className="inline-block p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
              <button 
                onClick={() => navigate('/plan')}
                className="bg-white text-primary font-headline-md text-body-md h-[56px] px-12 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-3 cursor-pointer font-bold"
                aria-label="Plan My Journey"
              >
                Plan Trip
                <span className="material-symbols-outlined" data-icon="auto_awesome">
                  auto_awesome
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
