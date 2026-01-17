# Frontend - React Web Application

## Structure Overview

```
src/
├── components/          # Reusable React components
│   ├── Auth/            # Authentication components (Login, SignUp, ProtectedRoute)
│   ├── Dashboard/       # Main dashboard layout & views
│   │   └── StressVisualization/  # Crop stress visualization (Map, Charts, Alerts)
│   ├── Common/          # Shared components (Header, Sidebar, NotificationCenter)
│   └── Layout/          # App-wide layout wrapper
├── services/            # API and external service integration
│   ├── api.js           # Axios instance with interceptors
│   ├── authService.js   # Firebase auth functions
│   ├── cropService.js   # CRUD operations for crop data
│   └── mlService.js     # ML service API calls
├── config/              # Configuration files
│   └── firebase.js      # Firebase initialization
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication context & hook
│   └── useCropData.js   # Crop data fetching logic
├── utils/               # Utility functions
│   ├── constants.js     # App-wide constants
│   ├── helpers.js       # Helper functions
│   └── formatters.js    # Data formatting utilities
├── styles/              # Global styles
│   └── global.css       # Base styling
├── App.jsx              # Main app component
└── main.jsx             # React entry point
```

## Key Features
- **Auth Components:** Login, SignUp, Protected Routes
- **Dashboard:** Real-time stress visualization with maps and charts
- **Services:** Centralized API calls and Firebase integration
- **Custom Hooks:** Reusable logic for auth & data fetching
- **Utils:** Constants, formatters, and helper functions

## Setup
1. Install dependencies: `npm install`
2. Create `.env` with Firebase config
3. Run dev server: `npm run dev`
