async function getWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=F89MADW3AF6DL89EFT9GFTJLN&contentType=json`);
        const weatherData = await response.json();
        displayWeather(weatherData);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        displayError('Failed to fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById('weather-result');
    const currentConditions = data.currentConditions;
    
    resultDiv.innerHTML = `
        <div class="weather-info">
            <h2>Weather in ${data.address}</h2>
            <p>Temperature: ${currentConditions.temp}°C</p>
            <p>Conditions: ${currentConditions.conditions}</p>
            <p>Humidity: ${currentConditions.humidity}%</p>
            <p>Wind Speed: ${currentConditions.windspeed} km/h</p>
        </div>
    `;
}

function displayError(message) {
    const resultDiv = document.getElementById('weather-result');
    resultDiv.innerHTML = `<div class="error">${message}</div>`;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('weather-form');
    const locationInput = document.getElementById('location-input');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const location = locationInput.value.trim();
        
        if (location) {
            getWeather(location);
        }
    });
});