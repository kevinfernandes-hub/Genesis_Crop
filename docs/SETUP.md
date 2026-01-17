# Setup Guide

## Prerequisites
- Node.js 16+ and npm
- Python 3.9+ (for ML service)
- Firebase project (free tier available)
- Git

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable:
   - **Authentication** (Email/Password)
   - **Firestore Database** (Start in test mode for development)
   - **Cloud Messaging** (for notifications)

4. Get your credentials:
   - **Frontend**: Project settings → Web app → Copy config
   - **Backend**: Project settings → Service account → Generate private key

## Step 2: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
EOF

# Start development server
npm run dev
# Access at http://localhost:5173
```

## Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com

# ML Service
ML_SERVICE_URL=http://localhost:5001/api
ML_SERVICE_API_KEY=your_ml_api_key

# FCM
FCM_SERVER_KEY=your_fcm_server_key
EOF

# Start development server
npm run dev
# Server runs on http://localhost:5000
```

## Step 4: ML Service Setup (Optional for Hackathon)

For quick testing, you can mock the ML service or use a simple Flask app:

```bash
# Navigate to ml-service directory
cd ml-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a simple Flask app (app.py):
# See ml-service/api for structure

# Run the service
python app.py
# Server runs on http://localhost:5001
```

## Step 5: Firestore Setup

Create the following collections in Firestore:

### Collection: `users`
```
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "createdAt": timestamp,
  "notificationPreferences": {
    "email": true,
    "push": true
  }
}
```

### Collection: `crops`
```
{
  "userId": "firebase_uid",
  "name": "Maize Field",
  "location": {
    "lat": 0.123,
    "lng": 34.567
  },
  "area": 5.5,
  "plantedDate": "2026-01-01",
  "variety": "Hybrid XYZ",
  "createdAt": timestamp
}
```

### Sub-collection: `crops/{cropId}/stressData`
```
{
  "timestamp": timestamp,
  "temperature": 28.5,
  "moisture": 65.2,
  "humidity": 75,
  "stressLevel": 45.3
}
```

## Step 6: Run All Services

In separate terminals:

```bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
npm run dev

# Terminal 3: ML Service (optional)
cd ml-service
python app.py
```

Visit `http://localhost:5173` to see the app!

## Troubleshooting

### Firebase Auth Issues
- Check that Authentication is enabled in Firebase Console
- Verify `FIREBASE_PROJECT_ID` and credentials are correct

### CORS Errors
- Backend CORS is configured for `http://localhost:5173`
- In production, update Vite config with your domain

### ML Service Connection
- For testing without ML service, return mock responses
- Ensure `ML_SERVICE_URL` points to the correct port

### Firestore Rules (Development)
For testing only, use these Firestore rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
⚠️ Make this more restrictive before production!

## Deployment

### Firebase Hosting (Frontend)
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### Backend Deployment
- Options: Google Cloud Run, Heroku, DigitalOcean, AWS
- Set environment variables on your hosting platform

### ML Service Deployment
- Docker: Build image and deploy to Cloud Run
- Vertex AI: Upload models directly to managed service
