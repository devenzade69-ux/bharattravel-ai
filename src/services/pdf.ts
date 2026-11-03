import { jsPDF } from 'jspdf';
import { GeneratedTrip } from '../types/trip';

/**
 * Generate and download a clean, structured PDF itinerary using jsPDF
 */
export const downloadTripPdf = (trip: GeneratedTrip): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let y = 20;

  // Colors
  const primaryColor = '#00458d';
  const textColor = '#191c1d';
  const secondaryTextColor = '#52606d';

  // Helper for adding new page if y reaches bottom
  const checkNewPage = (neededSpace: number = 15) => {
    if (y + neededSpace >= pageHeight - 15) {
      doc.addPage();
      y = 20;
    }
  };

  // Header Banner
  doc.setFillColor(0, 69, 141);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('BharatTravel AI - Trip Itinerary', margin, 20);

  y = 40;

  // Trip Title & Basic Info
  doc.setTextColor(primaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Destination: ${trip.destination}`, margin, y);
  y += 8;

  doc.setTextColor(textColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Duration: ${trip.days} Days  |  Budget: ${trip.budget}  |  Travel Type: ${trip.travelType}`, margin, y);
  y += 6;

  if (trip.bestTimeToVisit) {
    doc.text(`Best Season to Visit: ${trip.bestTimeToVisit}`, margin, y);
    y += 6;
  }

  if (trip.overallEstimatedBudget) {
    doc.text(`Overall Estimated Budget: ${trip.overallEstimatedBudget}`, margin, y);
    y += 6;
  }

  // Divider Line
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Weather Information (if present)
  if (trip.weather) {
    checkNewPage(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor);
    doc.text('Live Destination Weather', margin, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    const condStr = trip.weather.weatherDescription || trip.weather.weatherCondition || 'Clear';
    doc.text(`Temperature: ${trip.weather.temperature}°C  |  Condition: ${condStr}`, margin, y);
    y += 5;
    doc.text(`Humidity: ${trip.weather.humidity}%  |  Wind Speed: ${trip.weather.windSpeed} km/h`, margin, y);
    y += 10;
  }

  // Day-wise Itinerary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text('Day-Wise Detailed Itinerary', margin, y);
  y += 8;

  trip.itinerary.forEach((dayData) => {
    checkNewPage(35);

    // Day Header
    doc.setFillColor(237, 238, 239);
    doc.rect(margin, y, pageWidth - (margin * 2), 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text(`Day ${dayData.day}: ${dayData.title}`, margin + 3, y + 6);
    y += 12;

    // Morning Slot
    if (dayData.morning && dayData.morning.title) {
      checkNewPage(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor);
      doc.text(`• Morning: ${dayData.morning.title}`, margin + 4, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(textColor);
      const mLines = doc.splitTextToSize(dayData.morning.description, pageWidth - (margin * 2) - 8);
      doc.text(mLines, margin + 8, y);
      y += (mLines.length * 4.5) + 3;
    }

    // Afternoon Slot
    if (dayData.afternoon && dayData.afternoon.title) {
      checkNewPage(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor);
      doc.text(`• Afternoon: ${dayData.afternoon.title}`, margin + 4, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(textColor);
      const aLines = doc.splitTextToSize(dayData.afternoon.description, pageWidth - (margin * 2) - 8);
      doc.text(aLines, margin + 8, y);
      y += (aLines.length * 4.5) + 3;
    }

    // Evening Slot
    if (dayData.evening && dayData.evening.title) {
      checkNewPage(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor);
      doc.text(`• Evening: ${dayData.evening.title}`, margin + 4, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(textColor);
      const eLines = doc.splitTextToSize(dayData.evening.description, pageWidth - (margin * 2) - 8);
      doc.text(eLines, margin + 8, y);
      y += (eLines.length * 4.5) + 3;
    }

    y += 4;
  });

  // Travel Tips
  if (trip.travelTips && trip.travelTips.length > 0) {
    checkNewPage(30);
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);
    doc.text('Essential Travel Tips', margin, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(textColor);

    trip.travelTips.forEach((tip) => {
      checkNewPage(10);
      const tipLines = doc.splitTextToSize(`• ${tip}`, pageWidth - (margin * 2));
      doc.text(tipLines, margin, y);
      y += (tipLines.length * 4.5) + 2;
    });
  }

  // Footer on last page
  checkNewPage(15);
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated by BharatTravel AI - Effortless AI Trip Planning for India', pageWidth / 2, y, { align: 'center' });

  // Save File
  const filename = `${trip.destination.toLowerCase().replace(/[^a-z0-9]/g, '_')}_itinerary.pdf`;
  doc.save(filename);
};
