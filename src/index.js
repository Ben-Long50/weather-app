// WeatherAPI Key: f895889501ed4aaf898183007240904
import './styles/main.css';
import './styles/reset-css.css';
import './styles/weather-icons.min.css';
import './styles/weather-icons.css';
import renderCurrentWeather, { renderForecast } from './renderDom';
import processInput, { getInputValue } from './userInput';
import toggleUnits, { getUnitsValue, toggleUnitTheme } from './toggleUnits';
// import { fetchConditionData } from './fetchData';

toggleUnitTheme(getUnitsValue(), 'london');
renderCurrentWeather('london');
renderForecast('london', 7);
// fetchConditionData();

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', processInput);
searchButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    processInput();
  }
});

const unitToggle = document.querySelector('#unit-toggle');
unitToggle.addEventListener('click', () => {
  toggleUnits();
  const location = getInputValue();
  toggleUnitTheme(getUnitsValue(), location);
  renderCurrentWeather(location);
  renderForecast(location, 7);
});
