import renderElements from './renderDom';

const userInput = document.querySelector('#user-input');

export default function processInput() {
  const locationInput = userInput.value;
  renderElements(locationInput);
}
