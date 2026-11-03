# ✈️ AI Trip Planner India (BharatTravel AI)

> **MCA Mini Project Submission**  
> **Project Name:** AI Trip Planner India  
> **Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Firebase Auth & Firestore, Groq AI SDK, OpenWeather API  

---

## 📖 Project Overview

**AI Trip Planner India (BharatTravel AI)** is a full-stack, AI-powered travel application designed specifically for travelers exploring India. It replicates the Google Stitch UI design system to deliver an intuitive, aesthetic, and responsive user experience across desktop, tablet, and mobile devices.

The application leverages **Groq AI SDK** (`llama-3.3-70b-versatile` with fallback to `openai/gpt-oss-20b`) to generate hyper-personalized, minute-by-minute day-wise itineraries tailored to the user's destination, budget tier, travel style, and interests. It integrates the **OpenWeather API** to fetch real-time climate metrics for destinations, stores saved trips in **Firebase Cloud Firestore**, manages user authentication via **Firebase Auth**, and allows exporting itineraries as clean **PDF documents**.

---

## ✨ Features Checklist

### 1. Home Page & Google Stitch UI
- High-key ambient design, glassmorphic cards, and Taj Mahal hero gradient overlay.
- Bento grid highlights: Hyper-Personalized Itineraries, Budget Planning, Weather Information, and Cloud Sync.
- Call-to-action sections and navigation routing.

### 2. Authentication & User Management (Firebase Auth)
- Email & Password Sign Up and Login with client-side input validations.
- Password visibility toggle.
- Interactive "Forgot Password?" email reset modal.
- Session persistence (`onAuthStateChanged`) and route protection for `/plan`, `/saved-trips`, and `/profile`.
- Firestore `users` collection synchronization storing `uid`, `name`, `email`, and `createdAt`.

### 3. AI-Powered Trip Generator (Groq AI API)
- Input Parameters: Destination in India, Duration (1–30 Days), Budget Tier (Low, Medium, High), Travel Type (Solo, Family, Friends, Couple), and Multi-select Interests (Adventure, Nature, Food, History, Shopping, Beaches, Spiritual).
- Powered by Groq AI SDK (`llama-3.3-70b-versatile` with automatic fallback to `openai/gpt-oss-20b`).
- Generates structured JSON output with:
  - Day-wise Morning, Afternoon, and Evening activities
  - Places to visit tags & recommended food items
  - Estimated daily budgets & overall total cost in INR (₹)
  - Essential travel tips & regional hotel recommendations

### 4. Real-Time Destination Weather (OpenWeather API)
- Live weather fetching for selected destinations.
- Displays current temperature (°C), weather condition, humidity (%), wind speed (km/h), weather icon, and best season to visit.
- Smart climate fallback handling for popular Indian travel hubs.

### 5. Cloud Firestore Trip Management & Search/Sort
- Save generated itineraries to user's Cloud Firestore account with instant toast notifications.
- **Search Bar**: Filter saved trips instantly by destination, travel style, or budget tier.
- **Sort Dropdown**: Sort trips by Newest First, Oldest First, Destination (A–Z), or Budget Tier.
- **View Modal**: Fullscreen/modal itinerary view.
- **Delete Dialog**: Confirmation dialog before deletion with automatic list refresh.

### 6. User Profile & Analytics
- User details card displaying Avatar, Name, Email, Base City, Member Since date, and UID.
- Real-time statistics: **Total Trips**, **Favorite Destination** (computed dynamically), and **Recent Trip**.
- Edit Profile modal to customize Name, Avatar choice, and Base City.

### 7. PDF Export & Utilities
- Download trip itinerary as a clean, multi-page PDF document using `jsPDF`.
- Includes project title, parameters, weather metrics, daily activities, and travel tips.

### 8. UX, Performance & Accessibility
- **Toast Notification System**: Global alerts for login, logout, trip generation, saving, deletion, profile update, and API errors.
- **Loading Skeletons**: Modern pulse skeleton cards replacing generic spinners.
- **Performance**: Code splitting via `React.lazy()`, `<Suspense>`, and Rollup `manualChunks`.
- **404 Custom Page**: Stitch UI error page for invalid URLs.
- **Accessibility**: ARIA labels, input IDs, keyboard focus indicators.

---

## 🛠️ Technology Stack

| Layer | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React 19 (TypeScript) |
| **Build Tool** | Vite 6 |
| **Styling & UI** | Tailwind CSS v3, Custom Design System (Stitch UI) |
| **Icons & Fonts** | Google Material Symbols Outlined, Inter |
| **Authentication** | Firebase Authentication |
| **Database** | Cloud Firestore |
| **Generative AI Engine** | Groq AI SDK (`groq-sdk`) — Model: `llama-3.3-70b-versatile` |
| **Weather API** | OpenWeather REST API |
| **PDF Generation** | jsPDF, html2canvas |
| **Deployment** | Vercel (`vercel.json`) |

---

## 📁 Project Structure

```
ai-trip-planner-india/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── vercel.json
├── .env.example
├── README.md
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ForgotPasswordModal.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── planner/
│   │   │   ├── TripForm.tsx
│   │   │   ├── TripCard.tsx
│   │   │   ├── TripResult.tsx
│   │   │   ├── WeatherCard.tsx
│   │   │   ├── TripDetailsModal.tsx
│   │   │   └── ConfirmDeleteDialog.tsx
│   │   ├── profile/
│   │   │   └── EditProfileModal.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── PdfButton.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── SortDropdown.tsx
│   │   └── ToastProvider.tsx
│   ├── context/
│   │   └── AuthProvider.tsx
│   ├── firebase/
│   │   └── config.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── PlanTripPage.tsx
│   │   ├── SavedTripsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── NotFound.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   ├── groq.ts
│   │   ├── pdf.ts
│   │   ├── tripService.ts
│   │   └── weather.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── trip.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the project root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Groq AI API Key
VITE_GROQ_API_KEY=your_groq_api_key

# OpenWeather API Key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

---

## 🚀 Installation & Local Running

1. **Clone the Repository & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`.

3. **Production Build & Preview**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Vercel Deployment Instructions

1. Push your project to your Git repository (GitHub / GitLab / Bitbucket).
2. Connect your repository to [Vercel](https://vercel.com).
3. Under **Project Settings -> Environment Variables**, configure all `VITE_*` keys listed in `.env.example`.
4. Click **Deploy**. Vercel will automatically build the project and route single-page requests using `vercel.json`.

---

## 🖼️ Application Screenshots (Placeholders)

- **Home Page**: Hero section with Taj Mahal theme and Bento Grid feature highlights.
- **Trip Planner Form & Result**: Interactive trip parameter inputs with live weather card and day-wise timeline itinerary.
- **Saved Trips Dashboard**: Search & sort bar, summary statistics cards, and grid of saved itineraries.
- **User Profile**: Profile photo avatar, statistics breakdown, and edit profile modal.

---

## 🔮 Future Scope

1. **Flight & Train Booking Integration**: Direct API integration with IRCTC / Indian airlines for seamless ticket booking.
2. **Offline Progressive Web App (PWA)**: Service workers enabling offline access to saved itineraries during travel.
3. **Multi-Language Voice Concierge**: Voice-activated AI assistant supporting Hindi, Tamil, Bengali, Marathi, and Telugu.
4. **Collaborative Group Travel**: Real-time multi-user editing for friends and family planning group trips together.

---

## 🎓 Submission Statement

Developed as an **MCA Mini Project**. Code is fully modularized, strictly typed, production-ready, and compiles with 0 build errors.
