import BaseController from '../utils/BaseController';
import ErrorResponse from '../utils/ErrorResponse';

export class TestController extends BaseController {
  constructor() {
    super('api/photos');
    this.router.get('', this.getPhoto);
  }

  async getPhoto(req, res, next) {
    try {
      return res.status(200).send({ data: 'NOTHING' });
    } catch (error) {
      next(new ErrorResponse(`THIS IS A TEST`, 404));
    }
  }
}
