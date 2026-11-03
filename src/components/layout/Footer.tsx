import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container dark:bg-surface-container-high w-full py-12 border-t border-outline-variant/30 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="col-span-1 md:col-span-1">
          <span className="text-headline-sm font-headline-sm text-primary dark:text-primary-fixed mb-4 block font-bold">
            BharatTravel AI
          </span>
          <p className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface">
            Redefining Indian travel through the power of intelligent automation and local empathy.
          </p>
        </div>
        <div>
          <h4 className="font-label-lg text-label-lg text-primary mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/plan" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface hover:underline transition-all cursor-pointer">
                Plan a Trip
              </Link>
            </li>
            <li>
              <Link to="/saved-trips" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface hover:underline transition-all cursor-pointer">
                Saved Trips
              </Link>
            </li>
            <li>
              <Link to="/profile" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface hover:underline transition-all cursor-pointer">
                My Profile
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-lg text-label-lg text-primary mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface hover:underline transition-all cursor-pointer">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface hover:underline transition-all cursor-pointer">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface hover:underline transition-all cursor-pointer">
                Feedback
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-lg text-label-lg text-primary mb-4">Stay Inspired</h4>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" data-icon="share">
              share
            </span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" data-icon="mail">
              mail
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-outline-variant/30">
        <p className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface opacity-70 text-center">
          © {new Date().getFullYear()} BharatTravel AI. MCA Mini Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
