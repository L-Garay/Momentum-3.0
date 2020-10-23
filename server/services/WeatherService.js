import axios from 'axios';
import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class WeatherService {
  async getWeather(coord) {
    let data = await axios({
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
    if (!data) {
      throw new ErrorResponse(
        'Unable to get weather for those coordinates',
        400
      );
    }
    return data;
  }
  async getNewWeather(city) {
    let data = await axios({
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
    if (!data) {
      throw new ErrorResponse('Unable to get weather for that city', 400);
    } else {
      return data;
    }
  }
}

export const weatherService = new WeatherService();
