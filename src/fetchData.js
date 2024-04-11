export default async function getLocationData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=f895889501ed4aaf898183007240904&q=${location}&aqi=no`,
      { mode: 'cors' },
    );
    const locationData = await response.json();
    return {
      name: locationData.location.name,
      icon: locationData.current.condition.icon,
      updated: locationData.current.last_updated,
      condition: locationData.current.condition.text,
      tempF: locationData.current.temp_f,
      tempC: locationData.current.temp_c,
      maxTempF: locationData.forecast.forecastday[0].day.maxtemp_f,
      maxTempC: locationData.forecast.forecastday[0].day.maxtemp_c,
      minTempF: locationData.forecast.forecastday[0].day.mintemp_f,
      minTempc: locationData.forecast.forecastday[0].day.mintemp_c,
      windMph: locationData.current.gust_mph,
      windKph: locationData.current.gust_kph,
      precipIn: locationData.current.precip_in,
      precipMm: locationData.current.precip_mm,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getForecastData(location, days, index) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=f895889501ed4aaf898183007240904&q=${location}&days=${days}&aqi=no`,
      { mode: 'cors' },
    );
    const locationData = await response.json();
    return {
      condition: locationData.forecast.forecastday[index].day.condition.text,
      icon: locationData.forecast.forecastday[index].day.condition.icon,
      maxTempF: locationData.forecast.forecastday[index].day.maxtemp_f,
      maxTempC: locationData.forecast.forecastday[index].day.maxtemp_c,
      minTempF: locationData.forecast.forecastday[index].day.mintemp_f,
      minTempC: locationData.forecast.forecastday[index].day.mintemp_c,
    };
  } catch (error) {
    console.error(error);
  }
}
