import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class UserService {
  async create(user) {
    try {
      return await dbContext.User.create(user);
    } catch (error) {
      throw new ErrorResponse(
        `Cant create user. Error: ${error}`,
        error.status
      );
    }
  }

  async getAll() {
    try {
      return await dbContext.User.find((u) => (u = {}));
    } catch (error) {
      throw new ErrorResponse(
        `Cant get all users. Error: ${error}`,
        error.status
      );
    }
  }
  async getById(id) {
    try {
      return await dbContext.User.findById(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find user with that id ${id}. Error: ${error}`,
        error.status
      );
    }
  }
  async updateUserById(user) {
    try {
      return await dbContext.User.findByIdAndUpdate(user.id, user);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find or update user with id ${user.id}. Error: ${error}`,
        error.status
      );
    }
  }

  async deleteUserById(id) {
    try {
      return await dbContext.User.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant delete user with that id ${id}. Error: ${error}`,
        error.status
      );
    }
  }
}

export const userService = new UserService();
