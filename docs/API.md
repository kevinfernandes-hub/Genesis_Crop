# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://yourdomain.com/api
```

## Authentication
All endpoints (except `/auth/*`) require a Bearer token in the header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "uid": "firebase_user_id"
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "idToken": "firebase_id_token"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token"
}
```

---

## Crop Endpoints

### Get All Crops
```
GET /crops
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "crop_id",
      "name": "Maize",
      "location": { "lat": 0.123, "lng": 34.567 },
      "area": 5.5,
      "plantedDate": "2026-01-01"
    }
  ]
}
```

### Get Crop by ID
```
GET /crops/{cropId}
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": { /* crop object */ }
}
```

### Add New Crop
```
POST /crops
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Wheat",
  "location": { "lat": 0.123, "lng": 34.567 },
  "area": 3.2,
  "plantedDate": "2026-01-10"
}

Response (201):
{
  "success": true,
  "message": "Crop added successfully",
  "id": "new_crop_id"
}
```

### Update Crop
```
PUT /crops/{cropId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name"
}

Response (200):
{
  "success": true,
  "message": "Crop updated successfully"
}
```

### Delete Crop
```
DELETE /crops/{cropId}
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Crop deleted successfully"
}
```

### Get Crop Stress Data
```
GET /crops/{cropId}/stress
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [
    {
      "timestamp": "2026-01-16T10:30:00Z",
      "temperature": 28.5,
      "moisture": 65.2,
      "humidity": 75,
      "stressLevel": 45.3
    }
  ]
}
```

---

## Prediction Endpoints

### Get Stress Prediction
```
POST /predictions/stress
Authorization: Bearer <token>
Content-Type: application/json

{
  "cropId": "crop_id",
  "sensorData": {
    "temperature": 28.5,
    "moisture": 65.2,
    "humidity": 75
  }
}

Response (200):
{
  "success": true,
  "data": {
    "stressLevel": 45.3,
    "stressCategory": "medium",
    "recommendation": "Increase irrigation..."
  }
}
```

### Get Health Score
```
GET /predictions/health/{cropId}
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "healthScore": 78.5,
    "status": "healthy",
    "lastUpdated": "2026-01-16T10:30:00Z"
  }
}
```

### Get Weather Impact
```
POST /predictions/weather-impact
Authorization: Bearer <token>
Content-Type: application/json

{
  "location": { "lat": 0.123, "lng": 34.567 },
  "weatherData": {
    "temperature": 32,
    "humidity": 45,
    "rainfall": 0
  }
}

Response (200):
{
  "success": true,
  "data": {
    "impact": "high_stress_risk",
    "recommendation": "Apply protective measures..."
  }
}
```

---

## Notification Endpoints

### Send Notification
```
POST /notifications/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "crop_alerts",
  "title": "Crop Alert",
  "body": "Your maize crop needs water",
  "data": {
    "cropId": "crop_id",
    "severity": "high"
  }
}

Response (200):
{
  "success": true,
  "message": "Notification sent successfully",
  "messageId": "fcm_message_id"
}
```

### Subscribe to Topic
```
POST /notifications/subscribe
Authorization: Bearer <token>
Content-Type: application/json

{
  "tokens": ["fcm_token_1", "fcm_token_2"],
  "topic": "crop_alerts"
}

Response (200):
{
  "success": true,
  "message": "Subscribed to topic: crop_alerts"
}
```

---

## Error Response Format

All errors follow this format:
```
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (access denied)
- `404`: Not Found
- `500`: Server Error
