import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class TodoListService {
  async getTodoListsByUserId(id) {
    try {
      return await dbContext.TodoList.find({ userId: id });
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photos with that id ${id}  ${error}`,
        error.response.status
      );
    }
  }
  async saveTodoList(todoList) {
    try {
      return await dbContext.TodoList.create(todoList);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find save that photo with id ${todoList._id}  ${error}`,
        404
      );
    }
  }
  async updateTodoList(todoList) {
    try {
      return await dbContext.TodoList.findByIdAndUpdate(todoList._id, todoList);
    } catch (error) {
      throw new ErrorResponse(
        `Can't update the todo with id ${todoList._id}`,
        error.response.status
      );
    }
  }
  async deleteTodoList(id) {
    try {
      return await dbContext.TodoList.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photo with that id.  ${error}`,
        error.response.status
      );
    }
  }
}

export const todoListService = new TodoListService();
