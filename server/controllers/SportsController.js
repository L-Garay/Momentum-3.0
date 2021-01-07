import BaseController from '../utils/BaseController';
import { sportsService } from '../services/SportsService';

export class SportsController extends BaseController {
  constructor() {
    super('api/sports');
    this.router.get('/:id', this.getSports);
  }

  async getSports(req, res, next) {
    try {
      let data = await sportsService.getSports(req.params.id);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
