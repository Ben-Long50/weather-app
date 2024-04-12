import renderCurrentWeather, {
  removeForecastCards,
  removeInfoCards,
  renderForecast,
} from './renderDom';

const userInput = document.querySelector('#user-input');

export default function processInput() {
  const locationInput = userInput.value;
  removeInfoCards();
  renderCurrentWeather(locationInput);
  removeForecastCards();
  renderForecast(locationInput, 7);
}
