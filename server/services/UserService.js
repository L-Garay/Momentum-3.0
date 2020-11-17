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
  async get() {
    try {
      // get the last/most recent document from User collection
      return await dbContext.User.findOne({}, { sort: { $natural: -1 } });
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
