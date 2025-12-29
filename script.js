import { API_CONFIG } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

  
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');

    if (searchBtn && cityInput) {
        searchBtn.addEventListener('click', searchWeather);
        
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });
    }

    
    updateCurrentDate();
});


function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('sq-AL', options);
    }
}


async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const searchError = document.getElementById('searchError');
    const city = cityInput.value.trim();

    if (!city) {
        showError('Ju lutem shkruani emrin e një qyteti');
        return;
    }


    try {
        searchError.style.display = 'none';
        
    
        const currentWeather = await fetchCurrentWeather(city);
        displayCurrentWeather(currentWeather);

     
        const forecast = await fetchForecast(city);
        displayForecast(forecast);

        
        document.getElementById('currentWeather').style.display = 'block';
        document.getElementById('forecastSection').style.display = 'block';

     
        document.getElementById('currentWeather').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

    } catch (error) {
        showError('Qyteti nuk u gjet. Ju lutem provoni përsëri.');
        console.error('Error fetching weather:', error);
    }
}


async function fetchCurrentWeather(city) {
    const url = `${API_CONFIG.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_CONFIG.API_KEY}&units=metric&lang=sq`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    return await response.json();
}

async function fetchForecast(city) {
    const url = `${API_CONFIG.BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_CONFIG.API_KEY}&units=metric&lang=sq`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Forecast not found');
    }
    
    return await response.json();
}

function displayCurrentWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('weatherDescription').textContent = data.weather[0].description;
    document.getElementById('weatherIcon').src = `${API_CONFIG.ICON_URL}/${data.weather[0].icon}@4x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
}


function displayForecast(data) {
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0];
        const hour = date.getHours();
        
      
        if (!dailyForecasts[dateKey] || Math.abs(hour - 12) < Math.abs(new Date(dailyForecasts[dateKey].dt * 1000).getHours() - 12)) {
            dailyForecasts[dateKey] = item;
        }
    });


    const forecastArray = Object.values(dailyForecasts).slice(0, 7);

    forecastArray.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('sq-AL', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('sq-AL', { day: 'numeric', month: 'short' });

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <div class="forecast-day">${dateStr}</div>
            <div class="forecast-icon">
                <img src="${API_CONFIG.ICON_URL}/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}">
            </div>
            <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            <div class="forecast-desc">${item.weather[0].description}</div>
        `;
        
        forecastGrid.appendChild(forecastCard);
    });
}

function showError(message) {
    const searchError = document.getElementById('searchError');
    if (searchError) {
        searchError.textContent = message;
        searchError.style.display = 'block';
        
        setTimeout(() => {
            searchError.style.display = 'none';
        }, 5000);
    }
}


function handleContactForm(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const form = e.target;
  
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    

    console.log('Form submitted:', data);
    
    formMessage.textContent = 'Mesazhi juaj u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.';
    formMessage.className = 'form-message success';

    form.reset();

    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}


export { searchWeather, displayCurrentWeather, displayForecast };
