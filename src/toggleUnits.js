/* eslint-disable default-case */
import getLocationData from './fetchData';

let units = 'imperial';

export default function toggleUnits() {
  if (units === 'imperial') {
    units = 'metric';
  } else if (units === 'metric') {
    units = 'imperial';
  }
}

export function getUnitsValue() {
  return units;
}

export function toggleTheme(day) {
  const weatherAppContainer = document.querySelector('#weather-app-container');
  const dividingLine = document.querySelector('#dividing-line');
  const searchButton = document.querySelector('#search-button');

  if (day === 1) {
    weatherAppContainer.classList.remove('night-theme');
    weatherAppContainer.classList.add('day-theme');
    dividingLine.style.backgroundColor = 'black';
    searchButton.style.color = 'black';
  } else {
    weatherAppContainer.classList.remove('day-theme');
    weatherAppContainer.classList.add('night-theme');
    dividingLine.style.backgroundColor = 'white';
    searchButton.style.color = 'white';
  }
}

export async function toggleUnitTheme(unit, location) {
  const locationData = await getLocationData(location);
  const { day } = locationData;

  const imperialButton = document.querySelector('#imperial');
  const metricButton = document.querySelector('#metric');

  switch (unit) {
    case 'imperial':
      switch (day) {
        case 1:
          imperialButton.classList.remove(
            'inactive-unit-day',
            'inactive-unit-night',
          );
          imperialButton.classList.add('active-unit');
          metricButton.classList.remove('active-unit', 'inactive-unit-night');
          metricButton.classList.add('inactive-unit-day');
          break;
        case 0:
          imperialButton.classList.remove(
            'inactive-unit-day',
            'inactive-unit-night',
          );
          imperialButton.classList.add('active-unit');
          metricButton.classList.remove('active-unit', 'inactive-unit-day');
          metricButton.classList.add('inactive-unit-night');
          break;
      }
      break;
    case 'metric':
      switch (day) {
        case 1:
          metricButton.classList.remove(
            'inactive-unit-day',
            'inactive-unit-night',
          );
          metricButton.classList.add('active-unit');
          imperialButton.classList.remove('active-unit', 'inactive-unit-night');
          imperialButton.classList.add('inactive-unit-day');
          break;
        case 0:
          metricButton.classList.remove(
            'inactive-unit-day',
            'inactive-unit-night',
          );
          metricButton.classList.add('active-unit');
          imperialButton.classList.remove('active-unit', 'inactive-unit-day');
          imperialButton.classList.add('inactive-unit-night');
          break;
      }
      break;
    default:
      imperialButton.classList.remove(
        'active-unit',
        'inactive-unit-day',
        'inactive-unit-night',
      );
      metricButton.classList.remove(
        'active-unit',
        'inactive-unit-day',
        'inactive-unit-night',
      );
  }
}
