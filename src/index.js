// WeatherAPI Key: f895889501ed4aaf898183007240904
import './styles/main.css';
import './styles/reset-css.css';
import renderCurrentWeather, { renderForecast } from './renderDom';
import processInput from './userInput';
import toggleUnits from './toggleUnits';
// import { fetchConditionData } from './fetchData';

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
  renderCurrentWeather('london');
  renderForecast('london', 7);
});
