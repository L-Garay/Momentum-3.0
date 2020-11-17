import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class LastUserService {
  async create(user) {
    try {
      let result = await dbContext.LastUser.findOne({});
      if (result) {
        await dbContext.LastUser.findOneAndDelete({});
      }
      return await dbContext.LastUser.create(user);
    } catch (error) {
      throw error;
    }
  }
  async get() {
    try {
      // get the last/most recent document from User collection
      return await dbContext.LastUser.findOne({});
    } catch (error) {
      throw error;
    }
  }
}

export const lastUserService = new LastUserService();
