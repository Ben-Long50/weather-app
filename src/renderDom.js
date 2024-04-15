import getLocationData, {
  getConditionIcon,
  getForecastData,
} from './fetchData';
import { getUnitsValue, toggleTheme } from './toggleUnits';

const currentContainer = document.querySelector('#current-data-container');
const infoContainer = document.querySelector('#info-container');
const conditionImage = currentContainer.querySelector('.condition-image');
const conditionDesc = currentContainer.querySelector('.condition-desc');
const locationName = document.querySelector('#location-name');
const updatedTime = document.querySelector('#updated-time');
const currentTemp = document.querySelector('#current-temp');

function renderInfoCard(id, header, iconClass) {
  const infoCard = document.createElement('div');
  infoCard.classList.add('info-card');
  const infoIconContainer = document.createElement('div');
  infoIconContainer.classList.add('info-icon-container');
  const infoIcon = document.createElement('i');
  infoIcon.classList.add('info-icon', 'wi', iconClass);
  const infoHeader = document.createElement('h3');
  infoHeader.classList.add('info-header');
  infoHeader.textContent = header;
  const infoValue = document.createElement('h2');
  infoValue.id = id;
  infoValue.classList.add('info-value');
  infoCard.appendChild(infoIconContainer);
  infoIconContainer.appendChild(infoIcon);
  infoCard.appendChild(infoHeader);
  infoCard.appendChild(infoValue);
  infoContainer.appendChild(infoCard);
}

function setConditionImage(locationData) {
  conditionImage.className = '';
  conditionImage.classList.add(
    'condition-image',
    'wi',
    getConditionIcon(locationData.condition, locationData.day),
  );
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

function setHighTemp(locationData) {
  renderInfoCard('high-temp', 'High:', 'wi-day-sunny');
  const highTemp = document.querySelector('#high-temp');
  const units = getUnitsValue();
  if (units === 'imperial') {
    highTemp.textContent = `${locationData.maxTempF} \u00B0F`;
  } else if (units === 'metric') {
    highTemp.textContent = `${locationData.maxTempC} \u00B0C`;
  }
}

function setWindSpeed(locationData) {
  renderInfoCard('wind-speed', 'Wind Speed:', 'wi-strong-wind');
  const windSpeed = document.querySelector('#wind-speed');
  const units = getUnitsValue();
  if (units === 'imperial') {
    windSpeed.textContent = `${locationData.windMph} mph`;
  } else if (units === 'metric') {
    windSpeed.textContent = `${locationData.windKph} kph`;
  }
}

function setSunrise(locationData) {
  renderInfoCard('sunrise', 'Sunrise:', 'wi-sunrise');
  const sunrise = document.querySelector('#sunrise');
  sunrise.textContent = locationData.sunrise;
}

function setLowTemp(locationData) {
  renderInfoCard('low-temp', 'Low:', 'wi-night-clear');
  const lowTemp = document.querySelector('#low-temp');
  const units = getUnitsValue();
  if (units === 'imperial') {
    lowTemp.textContent = `${locationData.minTempF} \u00B0F`;
  } else if (units === 'metric') {
    lowTemp.textContent = `${locationData.minTempC} \u00B0C`;
  }
}

function setPrecip(locationData) {
  renderInfoCard('precip', 'Precipitaion:', 'wi-raindrops');
  const precip = document.querySelector('#precip');
  const units = getUnitsValue();
  if (units === 'imperial') {
    precip.textContent = `${locationData.precipIn} in`;
  } else if (units === 'metric') {
    precip.textContent = `${locationData.precipMm} mm`;
  }
}

function setSunset(locationData) {
  renderInfoCard('sunset', 'Sunset:', 'wi-sunset');
  const sunset = document.querySelector('#sunset');
  sunset.textContent = locationData.sunset;
}

export default async function renderCurrentWeather(location) {
  removeInfoCards();
  try {
    const locationData = await getLocationData(location);
    setConditionImage(locationData);
    setConditionDesc(locationData);
    setLocationName(locationData);
    setUpdatedTime(locationData);
    setCurrentTemp(locationData);
    setHighTemp(locationData);
    setWindSpeed(locationData);
    setSunrise(locationData);
    setLowTemp(locationData);
    setPrecip(locationData);
    setSunset(locationData);
    toggleTheme(locationData.day);
  } catch (error) {
    console.error(error);
  }
}

const forecastContainer = document.querySelector('#forecast-container');

function createForecastCard(forecast) {
  const units = getUnitsValue();
  const forecastCard = document.createElement('div');
  forecastCard.classList.add('forecast-card');
  console.log(forecast.day);
  console.log(forecast.condition);
  if (forecast.day === 1) {
    forecastCard.style.backgroundColor = 'var(--day-color)';
  } else if (forecast.day === 0) {
    forecastCard.style.backgroundColor = 'var(--night-color)';
  }
  forecastContainer.appendChild(forecastCard);
  const day = document.createElement('h3');
  day.classList.add('forecast-day');
  const forecastDate = forecast.date;
  const weekday = new Date(forecastDate).toLocaleDateString('en-US', {
    weekday: 'long',
  });
  day.textContent = weekday;
  const highTempData = document.createElement('h2');
  highTempData.classList.add('forecast-data');
  if (units === 'imperial') {
    highTempData.textContent = `${forecast.maxTempF} \u00B0F`;
  } else if (units === 'metric') {
    highTempData.textContent = `${forecast.maxTempC} \u00B0C`;
  }
  const lowTempData = document.createElement('h2');
  lowTempData.classList.add('forecast-data');
  if (units === 'imperial') {
    lowTempData.textContent = `${forecast.minTempF} \u00B0F`;
  } else if (units === 'metric') {
    lowTempData.textContent = `${forecast.minTempC} \u00B0C`;
  }
  const icon = document.createElement('i');
  icon.classList.add(
    'forecast-icon',
    'wi',
    getConditionIcon(forecast.condition, forecast.day),
  );
  const condition = document.createElement('h3');
  condition.classList.add('forecast-condition');
  condition.textContent = forecast.condition;
  forecastCard.appendChild(day);
  forecastCard.appendChild(highTempData);
  forecastCard.appendChild(icon);
  forecastCard.appendChild(condition);
  forecastCard.appendChild(lowTempData);
}

export function removeInfoCards() {
  while (infoContainer.firstChild) {
    infoContainer.firstChild.remove();
  }
}

export function removeForecastCards() {
  while (forecastContainer.firstChild) {
    forecastContainer.firstChild.remove();
  }
}

export async function renderForecast(location, days) {
  removeForecastCards();
  for (let i = 1; i < days; i++) {
    const forecast = await getForecastData(location, days, i);
    createForecastCard(forecast);
  }
}
