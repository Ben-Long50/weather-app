import renderElements, {
  removeForecastCards,
  renderForecast,
} from './renderDom';

const userInput = document.querySelector('#user-input');

export default function processInput() {
  const locationInput = userInput.value;
  renderElements(locationInput);
  removeForecastCards();
  renderForecast(locationInput, 6);
}
