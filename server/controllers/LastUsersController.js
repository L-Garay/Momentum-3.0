import BaseController from '../utils/BaseController';
import { lastUserService } from '../services/LastUserService';

export class UsersController extends BaseController {
  constructor() {
    super('api/lastuser');
    this.router.post('', this.create).get('', this.get);
  }

  async create(req, res, next) {
    try {
      let data = await lastUserService.create(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async get(req, res, next) {
    try {
      let data = await lastUserService.get();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
