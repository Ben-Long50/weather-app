import renderCurrentWeather, {
  removeForecastCards,
  removeInfoCards,
  renderForecast,
} from './renderDom';

const userInput = document.querySelector('#user-input');

let inputValue = '';

export default function processInput() {
  inputValue = userInput.value;
  console.log(inputValue);
  removeInfoCards();
  renderCurrentWeather(inputValue);
  removeForecastCards();
  renderForecast(inputValue, 7);
}

export function getInputValue() {
  return inputValue;
}
