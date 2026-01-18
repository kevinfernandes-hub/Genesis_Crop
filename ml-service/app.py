"""
FastAPI Application for Crop Stress Prediction
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import os
import json
from xgboost import XGBClassifier

# Initialize FastAPI app
app = FastAPI(
    title="Crop Stress Monitoring API",
    description="ML-powered crop stress prediction system for precision agriculture",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
MODEL_PATH = os.path.join(MODELS_DIR, 'crop_stress_model.json')
TRAIN_DATA_PATH = os.path.join(MODELS_DIR, 'X_train.csv')
FEATURES_PATH = os.path.join(MODELS_DIR, 'feature_columns.json')

# Load model
try:
    best_model = XGBClassifier()
    best_model.load_model(MODEL_PATH)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    best_model = None

# Load training data
try:
    X_train = pd.read_csv(TRAIN_DATA_PATH)
    print("✅ Training data loaded")
except Exception as e:
    print(f"❌ Error loading training data: {e}")
    X_train = None

# Load feature columns
try:
    with open(FEATURES_PATH, 'r') as f:
        X_cols = json.load(f)
    print("✅ Feature columns loaded")
except Exception as e:
    print(f"❌ Error loading features: {e}")
    X_cols = None

# Stress mapping
STRESS_MAP = {0: "Healthy", 1: "Moderate Stress", 2: "Severe Stress"}

# Request model
class PredictionRequest(BaseModel):
    season: str
    crop_type: str
    temperature: float
    rainfall: float
    soil_moisture: float
    pest_damage: float

@app.get('/')
def root():
    """Root endpoint"""
    return {"message": "Crop Stress API is running"}

@app.post('/api/predict')
def predict(request_data: PredictionRequest):
    """API endpoint for crop stress prediction"""
    try:
        if best_model is None or X_train is None or X_cols is None:
            return {'success': False, 'error': 'Model not loaded'}
        
        # Create baseline with average values
        baseline = X_train.mean().to_dict()
        
        # Parse user input
        user_season = request_data.season
        user_crop = request_data.crop_type
        user_temp = float(request_data.temperature)
        user_rainfall = float(request_data.rainfall)
        user_moisture = float(request_data.soil_moisture)
        user_pest_damage = float(request_data.pest_damage)
        
        # Reset categorical flags
        for col in X_cols:
            if "Season_" in col or "Crop_Type_" in col:
                baseline[col] = 0
        
        # Set user-selected flags
        season_col = f"Season_{user_season}"
        crop_col = f"Crop_Type_{user_crop}"
        
        if season_col in baseline:
            baseline[season_col] = 1
        if crop_col in baseline:
            baseline[crop_col] = 1
        
        # Update numerical values
        baseline['T2M'] = user_temp
        baseline['Rainfall'] = user_rainfall
        baseline['Soil_Moisture'] = user_moisture
        baseline['Pest_Damage'] = user_pest_damage
        
        # Recalculate interaction features
        baseline['pest_damage_x_moisture'] = baseline['Pest_Damage'] * baseline['Soil_Moisture']
        baseline['pest_damage_x_temp_deviation'] = baseline['Pest_Damage'] * baseline.get('temp_deviation_from_normal', 0)
        baseline['pest_hotspots_x_rainfall'] = baseline.get('Pest_Hotspots', 0) * baseline['Rainfall']
        
        # Make prediction
        live_data = pd.DataFrame([baseline])[X_cols]
        prediction_code = best_model.predict(live_data)[0]
        prediction_text = STRESS_MAP[int(prediction_code)]
        
        # Get confidence scores
        proba = best_model.predict_proba(live_data)[0]
        confidence = float(np.max(proba)) * 100
        
        return {
            'success': True,
            'prediction': prediction_text,
            'confidence': round(confidence, 2),
            'probabilities': {
                'Healthy': round(float(proba[0]) * 100, 2),
                'Moderate Stress': round(float(proba[1]) * 100, 2),
                'Severe Stress': round(float(proba[2]) * 100, 2)
            }
        }
        
    except Exception as e:
        return {'success': False, 'error': str(e)}

@app.get('/api/health')
def health():
    """Health check endpoint"""
    return {'status': 'ok', 'model_loaded': best_model is not None}

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🌾 Crop Stress Classification API")
    print("="*50)
    print(f"📍 Server running at http://localhost:8001")
    print("="*50 + "\n")
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8001)
