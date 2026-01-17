# Climate-Aware Crop Stress Monitoring System (Genesis)
> A GDG hackathon project for real-time crop stress detection and management

## Tech Stack
- **Frontend:** React + Vite, Next.js
- **Backend:** Node.js + Express
- **Database:** Firebase (Firestore + Auth)
- **ML Service:** Python (separate, API-based)
- **Weather API:** OpenWeatherMap (real-time data)
- **Notifications:** Firebase Cloud Messaging
- **Hosting:** Firebase Hosting
- **Optional:** WhatsApp API, Google TTS/STT

## Project Structure

```
├── climate-aware-crop/ # Next.js main application
├── frontend/           # React web application
├── backend/            # Node.js Express API
├── ml-service/         # Python ML service (reference)
├── docs/               # Project documentation
└── README.md           # This file
```

## Quick Start

### Climate-Aware Crop (Main App)
```bash
cd climate-aware-crop
npm install
npm run dev  # Runs on http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### ML Service
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

## Features
- User authentication with Firebase
- Real-time crop stress visualization
- AI-powered predictions from ML service
- Push notifications via FCM
- Weather-aware advisories with real-time data
- Multi-language support (English, Hindi, Tamil, Telugu, Kannada)
- Audio caching for performance
- WhatsApp voice advisory delivery
- Responsive dashboard with Material Design
- Data persistence in Firestore

## Documentation
- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Setup Guide](docs/SETUP.md)

## Team
Built for GDG Hackathon 2026

## License
MIT

