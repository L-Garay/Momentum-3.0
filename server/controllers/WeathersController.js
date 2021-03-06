import BaseController from '../utils/BaseController';
import { weatherService } from '../services/WeatherService';
import ErrorResponse from '../utils/ErrorResponse';

export class WeathersController extends BaseController {
  constructor() {
    super('api/weather');
    this.router
      .post('', this.getWeather)
      .post('/change', this.getNewWeather)
      .post('/forecast', this.getWeatherForecast)
      .post('/forecast/new', this.getNewWeatherForecast);
  }

  async getWeather(req, res, next) {
    try {
      let data = await weatherService.getWeather(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getNewWeather(req, res, next) {
    try {
      let data = await weatherService.getNewWeather(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      // NOTE use this method to demonstrate how ErrorResponse isn't working
      console.log(error);
      next(error);
    }
  }
  async getWeatherForecast(req, res, next) {
    try {
      let data = await weatherService.getWeatherForecast(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getNewWeatherForecast(req, res, next) {
    try {
      let data = await weatherService.getNewWeatherForecast(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
