import BaseController from '../utils/BaseController';
import { userService } from '../services/UserService';

export class UsersController extends BaseController {
  constructor() {
    super('api/users');
    this.router.post('', this.create).get('', this.getAll);
  }

  async create(req, res, next) {
    try {
      let data = await userService.create(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  // async get(req, res, next) {
  //   try {
  //     let data = await userService.get();
  //     return res.status(200).send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async getAll(req, res, next) {
    try {
      let data = await userService.getAll();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
