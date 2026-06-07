import axios from "axios";
import 'dotenv/config';

const API_URL_CURRENT = `https://api.openweathermap.org/data/2.5/weather?lat=38.43655&lon=-122.65975&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`;

const API_URL_FORECAST = "";

export async function getCurrentWeatherData() {
  const response = await axios.get(API_URL_CURRENT);
  const data = response.data;
  
  const currentWeatherData = {
    currTemp: Math.round(data.main.temp),
    currMinTemp: Math.round(data.main.temp_min),
    currMaxTemp: Math.round(data.main.temp_max),
    currIcon: data.weather[0].icon,
    city: data.name
  };

  return currentWeatherData;
}