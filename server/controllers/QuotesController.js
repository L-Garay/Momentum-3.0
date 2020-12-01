import BaseController from '../utils/BaseController';
import { quoteService } from '../services/QuoteService';

export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes');
    this.router
      .get('', this.getQuote)
      .get('/:id', this.getQuoteById)
      .post('', this.saveQuote)
      .delete('/:id', this.deleteQuote);
  }

  async getQuote(req, res, next) {
    try {
      let data = await quoteService.getQuote();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async saveQuote(req, res, next) {
    try {
      let data = await quoteService.saveQuote(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getQuoteById(req, res, next) {
    try {
      let data = await quoteService.getQuoteById(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteQuote(req, res, next) {
    try {
      await quoteService.deleteQuote(req.params.id);
      return res.status(200).send('Successfully deleted');
    } catch (error) {
      next(error);
    }
  }
}
