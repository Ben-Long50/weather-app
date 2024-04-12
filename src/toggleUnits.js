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

export function toggleTheme(updatedTime, sunrise, sunset) {
  const weatherAppContainer = document.querySelector('#weather-app-container');
  const dividingLine = document.querySelector('#dividing-line');
  const [date, time] = updatedTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const currentTime = hours * 60 + minutes;

  const sunriseTime = convertTo24HourFormat(sunrise);
  const sunsetTime = convertTo24HourFormat(sunset);

  const sunriseMinutes = convertToMinutes(sunriseTime);
  const sunsetMinutes = convertToMinutes(sunsetTime);

  if (currentTime > sunriseMinutes && currentTime < sunsetMinutes) {
    weatherAppContainer.classList.remove('night-theme');
    weatherAppContainer.classList.add('day-theme');
    dividingLine.style.backgroundColor = 'black';
  } else {
    weatherAppContainer.classList.remove('day-theme');
    weatherAppContainer.classList.add('night-theme');
    dividingLine.style.backgroundColor = 'white';
  }
}

function convertToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function convertTo24HourFormat(time12h) {
  const [time, period] = time12h.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let hours24 = hours;

  if (period === 'PM' && hours < 12) {
    hours24 += 12;
  } else if (period === 'AM' && hours === 12) {
    hours24 = 0;
  }

  return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
