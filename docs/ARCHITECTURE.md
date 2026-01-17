# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WEB BROWSER                              │
│                  (React Frontend)                           │
│         http://localhost:5173 or Firebase Hosting          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST (port 5173)
                         │ Uses Bearer Token (JWT)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API                               │
│          Node.js + Express (port 5000)                      │
│                                                             │
│  ├── Authentication (Firebase Auth)                        │
│  ├── Crop Management (Firestore)                           │
│  ├── Notification Service (FCM)                            │
│  └── ML Service Proxy                                      │
└────┬──────────────────────────────────────────────┬─────────┘
     │                                              │
     │ gRPC/REST                                    │ HTTP
     ▼                                              ▼
┌──────────────────┐                      ┌──────────────────────┐
│  FIRESTORE DB    │                      │   ML SERVICE         │
│  (Data Store)    │                      │  (Python Flask/      │
│                  │                      │   FastAPI)           │
│  • Crops         │                      │  port 5001           │
│  • Users         │                      │                      │
│  • Stress Data   │                      │  Predictions:        │
│  • Alerts        │                      │  • Stress Level      │
└──────────────────┘                      │  • Health Score      │
                                          │  • Weather Impact    │
                                          └──────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│          FIREBASE CLOUD MESSAGING (FCM)                       │
│  Push notifications to mobile/web clients                    │
└──────────────────────────────────────────────────────────────┘
```

## Component Description

### Frontend (React)
- **Components**: Auth, Dashboard, Visualizations, Common UI
- **Services**: API calls, Firebase integration
- **Hooks**: Custom logic (auth, data fetching)
- **Utils**: Constants, formatters, helpers

### Backend (Node.js + Express)
- **Routes**: API endpoints for auth, crops, predictions, notifications
- **Controllers**: Business logic for each domain
- **Services**: External integrations (Firebase, ML service)
- **Middleware**: Auth, error handling, validation

### ML Service (Python)
- Separate deployment (docker/cloud)
- Exposes prediction endpoints
- Trained models for crop stress, health, weather impact
- Backend calls via HTTP with API key authentication

### Database (Firestore)
- Collections: `users`, `crops`, `stressData`, `alerts`
- Real-time syncing with frontend
- Indexed for efficient queries

### Notifications (FCM)
- Push notifications for crop alerts
- Topic-based subscriptions
- Integration via Firebase Admin SDK

## Data Flow

1. **User Login**: Firebase Auth → JWT token stored locally
2. **View Crops**: Frontend → Backend → Firestore → Frontend
3. **Get Prediction**: Frontend → Backend → ML Service → Frontend
4. **Crop Alert**: Backend scheduled job → FCM → Frontend/Mobile
5. **Real-time Updates**: Firestore listeners → Frontend

## Security

- **Authentication**: Firebase Auth + JWT
- **Authorization**: User ID verification in routes
- **ML Service**: API key in header
- **Data Privacy**: Firestore rules by user ID
