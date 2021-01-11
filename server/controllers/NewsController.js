import BaseController from '../utils/BaseController';
import { newsService } from '../services/NewsService';

export class NewsController extends BaseController {
  constructor() {
    super('api/news');
    this.router
      .get('/trending', this.getNewsTrending)
      .get('/category/:category', this.getNewsCategory)
      // .get('/category/v2/:category', this.getNewsCategoryExtra)
      .post('/change', this.getNewNews);
  }

  async getNewsTrending(req, res, next) {
    try {
      let data = await newsService.getNewsTrending();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getNewsCategory(req, res, next) {
    try {
      let data = await newsService.getNewsCategory(req.params.category);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  // async getNewsCategoryExtra(req, res, next) {
  //   try {
  //     let data = await newsService.getNewsCategoryExtra(req.params.category);
  //     return res.status(200).send(data.data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async getNewNews(req, res, next) {
    try {
      let data = await newsService.getNewNews(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
