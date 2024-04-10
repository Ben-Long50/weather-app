export default async function getLocationData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f895889501ed4aaf898183007240904&q=${location}&aqi=no`,
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
      windMph: locationData.current.gust_mph,
      windKph: locationData.current.gust_kph,
      precipIn: locationData.current.precip_in,
      precipMm: locationData.current.precip_mm,
    };
  } catch (error) {
    console.error(error);
  }
}
