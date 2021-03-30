import BaseController from '../utils/BaseController';
import { clockService } from '../services/ClockService';

export class ClocksController extends BaseController {
  constructor() {
    super('api/clocks');
    this.router.get('/:city', this.getTime);
  }

  async getTime(req, res, next) {
    console.log(req.params.city, 'params');
    try {
      let data = await clockService.getTime(req.params.city);
      return res.status(200).send(data.data.resourceSets);
    } catch (error) {
      next(error);
    }
  }
}
