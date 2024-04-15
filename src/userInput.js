import renderCurrentWeather, {
  removeForecastCards,
  removeInfoCards,
  renderForecast,
} from './renderDom';
import { getUnitsValue, toggleUnitTheme } from './toggleUnits';

const userInput = document.querySelector('#user-input');

let inputValue = '';

export default function processInput() {
  inputValue = userInput.value;
  removeInfoCards();
  renderCurrentWeather(inputValue);
  removeForecastCards();
  renderForecast(inputValue, 7);
  toggleUnitTheme(getUnitsValue(), inputValue);
}

export function getInputValue() {
  return inputValue;
}
