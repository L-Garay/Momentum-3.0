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
  async updateUserById(user) {
    try {
      await dbContext.LastUser.findByIdAndUpdate(user.id, user);
    } catch (error) {
      throw new ErrorResponse('Cant find user with that id', 400);
    }
  }
}

export const lastUserService = new LastUserService();
