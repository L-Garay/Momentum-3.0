import BaseController from '../utils/BaseController';
import { newsService } from '../services/NewsService';

export class NewsController extends BaseController {
  constructor() {
    super('api/news');
    this.router.get('', this.getNews).post('/change', this.getNewNews);
  }

  async getNews(req, res, next) {
    try {
      let data = await newsService.getNews();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getNewNews(req, res, next) {
    try {
      let data = await newsService.getNewNews(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
