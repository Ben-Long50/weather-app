import getLocationData from './fetchData';
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
  updatedTime.textContent = `Last Updated: ${formattedDate}`;
}

function setCurrentTemp(locationData) {
  const units = getUnitsValue();
  if (units === 'imperial') {
    currentTemp.textContent = locationData.tempF;
  } else if (units === 'metric') {
    currentTemp.textContent = locationData.tempC;
  }
}

function setWindSpeed(locationData) {
  const units = getUnitsValue();
  if (units === 'imperial') {
    windSpeed.textContent = locationData.windMph;
  } else if (units === 'metric') {
    windSpeed.textContent = locationData.windKph;
  }
}

function setPrecip(locationData) {
  const units = getUnitsValue();
  if (units === 'imperial') {
    precip.textContent = locationData.precipIn;
  } else if (units === 'metric') {
    precip.textContent = locationData.precipMm;
  }
}

export default async function renderElements(location) {
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
