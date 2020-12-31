import BaseController from '../utils/BaseController';
import { financeService } from '../services/FinanceService';

export class FinanceController extends BaseController {
  constructor() {
    super('api/finance');
    this.router
      .get('/news', this.getFinanceNews)
      .get('/win', this.getFinanceWinners)
      .get('/lose', this.getFinanceLosers)
      .get('/undervalued', this.getUndervalued)
      .get('/technology', this.getTechnology)
      .get('/growers', this.getGrowers);
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
  async getUndervalued(req, res, next) {
    try {
      let data = await financeService.getUndervalued();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getTechnology(req, res, next) {
    try {
      let data = await financeService.getTechnology();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getGrowers(req, res, next) {
    try {
      let data = await financeService.getGrowers();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
