# Backend - Node.js + Express API

## Structure Overview

```
src/
├── routes/              # API route definitions
│   ├── auth.js          # Authentication endpoints (/auth/login, /auth/register)
│   ├── crops.js         # Crop CRUD endpoints
│   ├── predictions.js   # ML prediction endpoints
│   └── notifications.js # Push notification endpoints
├── controllers/         # Request handlers and business logic
│   ├── authController.js        # Auth logic
│   ├── cropController.js        # Crop management logic
│   ├── mlController.js          # ML service integration logic
│   └── notificationController.js # FCM notification logic
├── services/            # External service integrations
│   ├── mlService.js             # Python ML service API calls
│   ├── firebaseService.js       # Firebase Firestore & Auth
│   └── notificationService.js   # Firebase Cloud Messaging
├── middleware/          # Express middleware
│   ├── auth.js          # JWT verification
│   ├── errorHandler.js  # Global error handling
│   └── validation.js    # Request validation
├── config/              # Configuration
│   ├── firebase.js      # Firebase SDK setup
│   └── env.js           # Environment variables
├── utils/               # Utility functions
│   ├── logger.js        # Logging utility
│   ├── errorHandler.js  # Custom error classes
│   └── constants.js     # API constants
└── server.js            # Express app entry point
```

## Key Features
- **JWT Authentication** for secure endpoints
- **Firebase Firestore** for data persistence
- **ML Service Integration** via HTTP calls
- **Error Handling Middleware** for consistent responses
- **Request Validation** for data integrity
- **Firebase Cloud Messaging** for notifications

## Setup
1. Install dependencies: `npm install`
2. Create `.env` with Firebase and API configs
3. Run development server: `npm run dev`

## API Endpoints Summary
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Add new crop
- `POST /api/predictions/stress` - Get stress prediction
- `POST /api/notifications/send` - Send notification
