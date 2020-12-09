import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class TodoService {
  async getTodosByUserId(id) {
    try {
      return await dbContext.Todo.find({ userId: id });
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photos with that id ${id}  ${error}`,
        error.response.status
      );
    }
  }
  async getTodosByListId(id) {
    try {
      return await dbContext.Todo.find({ listId: id });
    } catch (error) {
      throw new ErrorResponse(`Can't do that`, error.response.status);
    }
  }
  async saveTodo(todo) {
    try {
      return await dbContext.Todo.create(todo);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find save that photo with id ${todo._id}  ${error}`,
        404
      );
    }
  }
  async updateTodo(todo) {
    try {
      return await dbContext.Todo.findByIdAndUpdate(todo._id, todo);
    } catch (error) {
      throw new ErrorResponse(
        `Can't update the todo with id ${todo._id}`,
        error.response.status
      );
    }
  }
  async deleteTodo(id) {
    try {
      return await dbContext.Todo.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photo with that id.  ${error}`,
        error.response.status
      );
    }
  }
}

export const todoService = new TodoService();
