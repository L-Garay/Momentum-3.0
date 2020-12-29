import BaseController from '../utils/BaseController';
import { financeService } from '../services/FinanceService';

export class FinanceController extends BaseController {
  constructor() {
    super('api/finance');
    this.router
      .get('/news', this.getFinanceNews)
      .get('/win', this.getFinanceWinners)
      .get('/lose', this.getFinanceLosers);
  }

  async getFinanceNews(req, res, next) {
    try {
      let data = await financeService.getFinanceNews();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getFinanceWinners(req, res, next) {
    try {
      let data = await financeService.getFinanceWinners();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getFinanceLosers(req, res, next) {
    try {
      let data = await financeService.getFinanceLosers();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
