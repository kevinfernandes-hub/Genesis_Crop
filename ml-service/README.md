# ML Service - Python (Reference Structure)

## Overview
This is a **reference structure only**. The ML service can be deployed:
- Separately (own server, Docker container)
- On cloud platforms (Google Cloud Run, AWS Lambda)
- As a managed ML service (Vertex AI, SageMaker)

## Structure

```
├── models/              # Trained ML models
│   ├── stress_model.pkl # Crop stress prediction model
│   └── health_model.pkl # Crop health scoring model
├── api/                 # API endpoints
│   ├── app.py           # Flask/FastAPI server
│   ├── routes.py        # Route definitions
│   └── middleware.py    # Auth & request handling
├── utils/               # Utility functions
│   ├── preprocessing.py # Data preprocessing
│   ├── postprocessing.py # Result formatting
│   └── constants.py     # ML constants
├── requirements.txt     # Python dependencies
└── README.md            # Service documentation
```

## Key Endpoints
- `POST /api/predict/stress` - Predict crop stress level
- `GET /api/health/{crop_id}` - Get health score
- `POST /api/predict/weather-impact` - Weather impact analysis

## Integration
The backend calls this service via HTTP. See [backend/src/services/mlService.js](../backend/src/services/mlService.js).

## Deployment
For hackathon, consider:
1. **Simple**: Flask API on same server
2. **Docker**: Containerized service
3. **Cloud**: Vertex AI / Google Cloud Run (scalable, cost-effective)
