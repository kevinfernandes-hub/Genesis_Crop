// Weather Service - Fetches real weather data
export const getWeatherData = async (latitude, longitude) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    
    if (!apiKey) {
      console.warn('OpenWeather API key not configured, using mock data')
      return getMockWeatherData()
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )

    if (!response.ok) {
      console.warn('Weather API failed, using mock data')
      return getMockWeatherData()
    }

    const data = await response.json()
    
    // Extract forecast for next 48 hours
    const forecast48h = data.list.slice(0, 8) // 8 * 3-hour intervals = 24 hours
    
    return {
      current: {
        temp: Math.round(data.list[0].main.temp),
        condition: data.list[0].weather[0].main,
        description: data.list[0].weather[0].description,
        humidity: data.list[0].main.humidity,
        windSpeed: Math.round(data.list[0].wind.speed * 3.6), // Convert m/s to km/h
      },
      forecast48h: forecast48h.map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      })),
      nextHighTemp: Math.round(Math.max(...forecast48h.map(item => item.main.temp))),
      precipitation: forecast48h.some(item => item.weather[0].main === 'Rain'),
      source: 'OpenWeatherMap'
    }
  } catch (error) {
    console.error('Weather fetch error:', error)
    return getMockWeatherData()
  }
}

// Mock data for development/fallback
export const getMockWeatherData = () => {
  return {
    current: {
      temp: 32,
      condition: 'Partly Cloudy',
      description: 'Partly sunny',
      humidity: 45,
      windSpeed: 12,
    },
    forecast48h: [
      { time: '12:00 PM', temp: 32, condition: 'Sunny', icon: '01d' },
      { time: '03:00 PM', temp: 34, condition: 'Sunny', icon: '01d' },
      { time: '06:00 PM', temp: 30, condition: 'Partly Cloudy', icon: '02d' },
      { time: '09:00 PM', temp: 26, condition: 'Clear', icon: '01n' },
      { time: '12:00 AM', temp: 24, condition: 'Clear', icon: '01n' },
      { time: '03:00 AM', temp: 23, condition: 'Clear', icon: '01n' },
      { time: '06:00 AM', temp: 22, condition: 'Clear', icon: '01n' },
      { time: '09:00 AM', temp: 28, condition: 'Sunny', icon: '01d' },
    ],
    nextHighTemp: 34,
    precipitation: false,
    source: 'Mock Data (Configure API key for real data)',
  }
}

// Get weather emoji based on condition
export const getWeatherEmoji = (condition) => {
  const conditionMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '💨',
    'Haze': '🌫️',
    'Dust': '🌪️',
    'Fog': '🌫️',
    'Sand': '🌪️',
    'Ash': '💨',
    'Squall': '💨',
    'Tornado': '🌪️',
    'Partly Cloudy': '⛅',
    'Sunny': '☀️',
  }
  return conditionMap[condition] || '🌤️'
}
