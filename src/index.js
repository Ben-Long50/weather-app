// WeatherAPI Key: f895889501ed4aaf898183007240904
import './styles/main.css';
import './styles/reset-css.css';
import './styles/weather-icons.min.css';
import './styles/weather-icons.css';
import renderCurrentWeather, { renderForecast } from './renderDom';
import processInput, { getInputValue } from './userInput';
import toggleUnits, { getUnitsValue, toggleUnitTheme } from './toggleUnits';
import { loadUserPosition } from './fetchData';

loadUserPosition();

const searchButton = document.querySelector('#search-button');
const userInput = document.querySelector('#user-input');
searchButton.addEventListener('click', processInput);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    processInput();
  }
});

const unitToggle = document.querySelector('#unit-toggle');
unitToggle.addEventListener('click', () => {
  toggleUnits();
  const location = getInputValue();
  toggleUnitTheme(getUnitsValue(), location);
  renderCurrentWeather(location);
  renderForecast(location, 3);
});
