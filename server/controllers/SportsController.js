import BaseController from '../utils/BaseController';
import { sportsService } from '../services/SportsService';

export class SportsController extends BaseController {
  constructor() {
    super('api/sports');
    this.router
      .get('/news', this.getSportsNews)
      .get('/news/more', this.getSportsNewsOffset);
  }

  async getSportsNews(req, res, next) {
    try {
      let data = await sportsService.getSportsNews();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getSportsNewsOffset(req, res, next) {
    try {
      let data = await sportsService.getSportsNewsOffset();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
