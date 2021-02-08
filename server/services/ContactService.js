import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';

class ContactService {
  async createContact(contact) {
    try {
      return await dbContext.Contact.create(contact);
    } catch (error) {
      throw new ErrorResponse(
        `Cant create contact, ${contact}.  ${error}`,
        error.response.status
      );
    }
  }
  async getContactsByUserId(id) {
    try {
      return await dbContext.Contact.find({ userId: id });
    } catch (error) {
      throw new ErrorResponse(
        `Cant find any contacts that belong to userId:${id}. ${error}`,
        error.response.status
      );
    }
  }
}

export const contactService = new ContactService();
