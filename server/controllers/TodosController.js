import BaseController from '../utils/BaseController';
import { todoService } from '../services/TodoService';

export class QuotesController extends BaseController {
  constructor() {
    super('api/todos');
    this.router
      .post('', this.saveTodo)
      .put('/:id', this.updateTodo)
      .delete('/:id', this.deleteTodo);
  }

  async saveTodo(req, res, next) {
    try {
      let data = await todoService.saveTodo(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async updateTodo(req, res, next) {
    try {
      let data = await todoService.updateTodo(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteTodo(req, res, next) {
    try {
      await todoService.deleteTodo(req.params.id);
      return res.status(200).send('Successfully deleted');
    } catch (error) {
      next(error);
    }
  }
}
