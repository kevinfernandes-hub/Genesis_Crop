let probabilityChart = null;

document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        season: document.getElementById('season').value,
        crop_type: document.getElementById('crop_type').value,
        temperature: document.getElementById('temperature').value,
        rainfall: document.getElementById('rainfall').value,
        soil_moisture: document.getElementById('soil_moisture').value,
        pest_damage: document.getElementById('pest_damage').value
    };
    
    // Show spinner
    document.getElementById('loadingSpinner').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayResults(data);
        } else {
            showError(data.error);
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    } finally {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }
});

function displayResults(data) {
    // Update prediction result
    const predictionElement = document.getElementById('predictionResult');
    predictionElement.textContent = data.prediction;
    
    // Color code the prediction
    if (data.prediction === 'Healthy') {
        predictionElement.style.color = '#4caf50';
    } else if (data.prediction === 'Moderate Stress') {
        predictionElement.style.color = '#ff9800';
    } else {
        predictionElement.style.color = '#f44336';
    }
    
    // Update confidence
    document.getElementById('confidenceValue').textContent = 
        `Confidence: ${data.confidence}%`;
    
    // Update chart
    updateProbabilityChart(data.probabilities);
    
    // Update recommendations
    updateRecommendations(data.prediction);
    
    // Show results
    document.getElementById('results').classList.remove('hidden');
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = '❌ Error: ' + message;
    errorElement.classList.remove('hidden');
}

function updateProbabilityChart(probabilities) {
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    
    if (probabilityChart) {
        probabilityChart.destroy();
    }
    
    probabilityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Healthy', 'Moderate Stress', 'Severe Stress'],
            datasets: [{
                label: 'Prediction Probability (%)',
                data: [
                    probabilities['Healthy'],
                    probabilities['Moderate Stress'],
                    probabilities['Severe Stress']
                ],
                backgroundColor: [
                    '#4caf50',
                    '#ff9800',
                    '#f44336'
                ],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function updateRecommendations(prediction) {
    const recommendationsList = document.getElementById('recommendationsList');
    let recommendations = [];
    
    if (prediction === 'Healthy') {
        recommendations = [
            '✅ Crop is in excellent condition',
            '📊 Continue regular monitoring',
            '💧 Maintain current irrigation schedule',
            '🐛 Keep pest management routine active'
        ];
    } else if (prediction === 'Moderate Stress') {
        recommendations = [
            '⚠️ Crop shows signs of moderate stress',
            '💧 Increase irrigation frequency',
            '🔍 Inspect for pest damage',
            '🧪 Check soil moisture levels',
            '📍 Consider fertilizer application',
            '🌡️ Monitor temperature conditions'
        ];
    } else {
        recommendations = [
            '🚨 URGENT: Crop is under severe stress',
            '💧 Increase irrigation immediately',
            '🚜 Consider emergency farming practices',
            '🐛 Implement pest control measures now',
            '👨‍🌾 Contact agricultural expert urgently',
            '📍 Plan for crop recovery strategy'
        ];
    }
    
    recommendationsList.innerHTML = recommendations
        .map(rec => `<li>${rec}</li>`)
        .join('');
}
