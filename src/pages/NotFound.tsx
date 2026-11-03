import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex items-center justify-center bg-mesh-blur px-margin-mobile py-20">
      <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant p-8 md:p-12 rounded-card tonal-elevation-2 text-center space-y-6 animate-in fade-in duration-300">
        {/* 404 Icon & Badge */}
        <div className="w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mx-auto shadow-md">
          <span className="material-symbols-outlined text-4xl" data-icon="map">
            map
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-primary font-mono block">404</span>
          <h1 className="font-headline-lg text-2xl md:text-headline-lg text-on-surface font-bold">
            Oops! Page Not Found
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
            The page or itinerary you are looking for might have been moved, renamed, or doesn't exist.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full h-14 bg-primary text-white font-headline-md text-body-lg rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] elevation-2 font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined" data-icon="home">
            home
          </span>
          <span>Go to Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
