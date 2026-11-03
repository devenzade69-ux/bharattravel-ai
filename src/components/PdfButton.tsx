import React, { useState } from 'react';
import { GeneratedTrip } from '../types/trip';
import { downloadTripPdf } from '../services/pdf';
import { useToast } from './ToastProvider';

interface PdfButtonProps {
  trip: GeneratedTrip;
  className?: string;
}

export const PdfButton: React.FC<PdfButtonProps> = ({ trip, className = '' }) => {
  const [downloading, setDownloading] = useState(false);
  const { showToast } = useToast();

  const handleDownload = () => {
    setDownloading(true);
    try {
      downloadTripPdf(trip);
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('Failed to download PDF. Please try again.', 'error');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`px-4 py-2.5 bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/40 rounded-full font-label-lg font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50 ${className}`}
      title="Download PDF Itinerary"
      aria-label="Download PDF Itinerary"
    >
      <span className="material-symbols-outlined text-primary text-xl" data-icon="picture_as_pdf">
        picture_as_pdf
      </span>
      <span>{downloading ? 'Preparing PDF...' : 'Download PDF'}</span>
    </button>
  );
};
