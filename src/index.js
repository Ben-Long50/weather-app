// WeatherAPI Key: f895889501ed4aaf898183007240904
import './styles/main.css';
import './styles/reset-css.css';
import renderElements from './renderDom';
import processInput from './userInput';

renderElements('huntington beach');

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', processInput);
searchButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    processInput();
  }
});
