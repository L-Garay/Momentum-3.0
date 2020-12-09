import BaseController from '../utils/BaseController';
import { todoListService } from '../services/TodoListService';
import { todoService } from '../services/TodoService';

export class TodoListsController extends BaseController {
  constructor() {
    super('api/todoLists');
    this.router
      .post('', this.saveTodoList)
      .get('/:id/todos', this.getTodosByListId)
      .put('/:id', this.updateTodoList)
      .delete('/:id', this.deleteTodoList);
  }

  async saveTodoList(req, res, next) {
    try {
      let data = await todoListService.saveTodoList(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getTodosByListId(req, res, next) {
    try {
      let data = await todoService.getTodosByListId(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async updateTodoList(req, res, next) {
    try {
      let data = await todoListService.updateTodoList(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteTodoList(req, res, next) {
    try {
      await todoListService.deleteTodoList(req.params.id);
      return res.status(200).send('Successfully deleted');
    } catch (error) {
      next(error);
    }
  }
}
