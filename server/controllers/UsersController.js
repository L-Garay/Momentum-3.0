import BaseController from '../utils/BaseController';
import { userService } from '../services/UserService';
import { lastUserService } from '../services/LastUserService';
import { photoService } from '../services/PhotoService';
import { quoteService } from '../services/QuoteService';
import { todoService } from '../services/TodoService';
import { todoListService } from '../services/TodoListService';
import { contactService } from '../services/ContactService';

export class UsersController extends BaseController {
  constructor() {
    super('api/users');
    this.router
      .post('', this.create)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/photos', this.getPhotosByUserId)
      .get('/:id/quotes', this.getQuotesByUserId)
      .get('/:id/todos', this.getTodosByUserId)
      .get('/:id/todoLists', this.getTodoListsByUserId)
      .get('/:id/contacts', this.getContactsByUserId)
      .put('', this.updateUserById)
      .delete('/:id', this.deleteUserById);
  }

  async create(req, res, next) {
    try {
      let data = await userService.create(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await userService.getAll();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await userService.getById(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getPhotosByUserId(req, res, next) {
    try {
      let data = await photoService.getPhotosByUserId(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getQuotesByUserId(req, res, next) {
    try {
      let data = await quoteService.getQuotesByUserId(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getTodosByUserId(req, res, next) {
    try {
      let data = await todoService.getTodosByUserId(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getTodoListsByUserId(req, res, next) {
    try {
      let data = await todoListService.getTodoListsByUserId(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getContactsByUserId(req, res, next) {
    try {
      let data = await contactService.getContactsByUserId(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async updateUserById(req, res, next) {
    try {
      let data = await userService.updateUserById(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteUserById(req, res, next) {
    try {
      await userService.deleteUserById(req.params.id);
      await lastUserService.deleteUserById(req.params.id);
      return res.status(200).send('Successfully deleted');
    } catch (error) {
      next(error);
    }
  }
}
