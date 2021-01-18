import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';
import User from '../models/User';

class UserService {
  async create(user) {
    try {
      // return await dbContext.User.create(user);
      return await User.create(user);
    } catch (error) {
      throw new ErrorResponse(`Cant create user.  ${error}`, 500);
    }
  }

  async getAll() {
    try {
      return await User.find((u) => (u = {}));
      // return await dbContext.User.find((u) => (u = {}));
    } catch (error) {
      throw new ErrorResponse(
        `Cant get all users.  ${error}`,
        error.response.status
      );
    }
  }
  async getById(id) {
    try {
      return await User.findById(id);
      // return await dbContext.User.findById(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find user with that id ${id}.  ${error}`,
        error.response.status
      );
    }
  }
  async updateUserById(user) {
    try {
      await User.findByIdAndUpdate(user.id, user);
      let updated = User.findById(user.id);
      return updated;
      // return await dbContext.User.findByIdAndUpdate(user.id, user);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find or update user with id ${user.id}.  ${error}`,
        error.response.status
      );
    }
  }

  async deleteUserById(id) {
    try {
      let userToRemove = await User.findById(id);
      if (!userToRemove) {
        console.log(`Can't find user by id ${id}`);
      }
      return userToRemove.remove();
      // return await dbContext.User.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant delete user with that id ${id}.  ${error}`,
        error.response.status
      );
    }
  }
}

export const userService = new UserService();
