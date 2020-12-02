import axios from 'axios';
import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class WeatherService {
  async getWeather(coord) {
    try {
      return await axios({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        },
        params: {
          units: 'imperial',
          lat: coord.lat,
          lon: coord.lon,
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get weather. Error: ${error}`,
        error.status
      );
    }
  }
  async getNewWeather(city) {
    try {
      return await axios({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        },
        params: {
          units: 'imperial',
          q: city.name,
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get weather for that city name, ${city}. Error: ${error}`,
        error.status
      );
    }
  }
}

export const weatherService = new WeatherService();
