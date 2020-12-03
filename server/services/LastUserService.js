import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class LastUserService {
  async create(user) {
    try {
      // If there is one already, find it and delete
      let result = await dbContext.LastUser.findOne({});
      if (result) {
        await dbContext.LastUser.findOneAndDelete({});
      }
      // Otherwise just create a new one / replace the old one
      return await dbContext.LastUser.create(user);
    } catch (error) {
      throw new ErrorResponse(
        `Can't create that user: ${error}`,
        error.response.status
      );
    }
  }
  async get() {
    try {
      // There should be only one
      return await dbContext.LastUser.findOne({});
    } catch (error) {
      throw new ErrorResponse(
        `Cant find user.  ${error}`,
        error.response.status
      );
    }
  }
  async updateUserById(user) {
    try {
      await dbContext.LastUser.findByIdAndUpdate(user.id, user);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find user with that id ${user.id}.  ${error}`,
        error.response.status
      );
    }
  }
}

export const lastUserService = new LastUserService();
