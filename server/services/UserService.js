import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class UserService {
  async create(user) {
    try {
      return await dbContext.User.create(user);
    } catch (error) {
      throw error;
    }
  }
  // async get() {
  //   try {
  //     // get the last/most recent document from User collection
  //     return await dbContext.User.findOne({}, { sort: { $natural: -1 } });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async getAll() {
    try {
      return await dbContext.User.find((u) => (u = {}));
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      return await dbContext.User.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async updateUserById(user) {
    try {
      return await dbContext.User.findByIdAndUpdate(user.id, user);
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id) {
    let data = await dbContext.User.findByIdAndDelete(id);
    if (!data) {
      throw new ErrorResponse('Cant find user with that id', 400);
    }
  }
}

export const userService = new UserService();
