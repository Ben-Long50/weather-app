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
