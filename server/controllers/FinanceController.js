import BaseController from '../utils/BaseController';
import { financeService } from '../services/FinanceService';

export class FinanceController extends BaseController {
  constructor() {
    super('api/finance');
    this.router.get('/news', this.getFinanceNews);
  }

  async getFinanceNews(req, res, next) {
    try {
      let data = await financeService.getFinanceNews();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
