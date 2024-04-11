import getLocationData, { getForecastData } from './fetchData';
import { getUnitsValue } from './toggleUnits';

const currentContainer = document.querySelector('#current-data-container');
const conditionImage = currentContainer.querySelector('.condition-image');
const conditionDesc = currentContainer.querySelector('.condition-desc');
const locationName = document.querySelector('#location-name');
const updatedTime = document.querySelector('#updated-time');
const currentTemp = document.querySelector('#current-temp');
const windSpeed = document.querySelector('#wind-speed');
const precip = document.querySelector('#precip');

function setConditionImage(locationData) {
  conditionImage.src = locationData.icon;
}

function setConditionDesc(locationData) {
  conditionDesc.textContent = locationData.condition;
}

function setLocationName(locationData) {
  locationName.textContent = locationData.name;
}

function setUpdatedTime(locationData) {
  const updatedDate = new Date(locationData.updated);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formattedDate = updatedDate.toLocaleDateString('en-US', options);
  updatedTime.textContent = `${formattedDate}`;
}

function setCurrentTemp(locationData) {
  const units = getUnitsValue();
  if (units === 'imperial') {
    currentTemp.textContent = `${locationData.tempF} \u00B0F`;
  } else if (units === 'metric') {
    currentTemp.textContent = `${locationData.tempC} \u00B0C`;
  }
}

function setWindSpeed(locationData) {
  const units = getUnitsValue();
  if (units === 'imperial') {
    windSpeed.textContent = `${locationData.windMph} mph`;
  } else if (units === 'metric') {
    windSpeed.textContent = `${locationData.windKph} kph`;
  }
}

function setPrecip(locationData) {
  const units = getUnitsValue();
  if (units === 'imperial') {
    precip.textContent = `${locationData.precipIn} in`;
  } else if (units === 'metric') {
    precip.textContent = `${locationData.precipMm} mm`;
  }
}

export default async function renderCurrentWeather(location) {
  try {
    const locationData = await getLocationData(location);
    setConditionImage(locationData);
    setConditionDesc(locationData);
    setLocationName(locationData);
    setUpdatedTime(locationData);
    setCurrentTemp(locationData);
    setWindSpeed(locationData);
    setPrecip(locationData);
  } catch (error) {
    console.error(error);
  }
}

const forecastContainer = document.querySelector('#forecast-container');

function createForecastCard(forecast) {
  const forecastCard = document.createElement('div');
  forecastCard.classList.add('forecast-card');
  forecastContainer.appendChild(forecastCard);
  const highTempData = document.createElement('h2');
  highTempData.textContent = forecast.maxTempF;
  const lowTempData = document.createElement('h2');
  lowTempData.textContent = forecast.minTempF;
  const icon = document.createElement('img');
  icon.src = forecast.icon;
  const condition = document.createElement('h3');
  condition.textContent = forecast.condition;
  forecastCard.appendChild(highTempData);
  forecastCard.appendChild(icon);
  forecastCard.appendChild(condition);
  forecastCard.appendChild(lowTempData);
}

export function removeForecastCards() {
  while (forecastContainer.firstChild) {
    forecastContainer.firstChild.remove();
  }
}

export async function renderForecast(location, days) {
  for (let i = 1; i < days; i++) {
    console.log('done');
    const forecast = await getForecastData(location, days, i);
    createForecastCard(forecast);
  }
}
