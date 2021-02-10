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
  async deleteContact(id) {
    try {
      return await dbContext.Contact.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Can't delete contact with id ${id}. ${error}`,
        error.response.status
      );
    }
  }
  async editContact(contact) {
    try {
      return await dbContext.Contact.findByIdAndUpdate(
        { _id: contact._id },
        contact
      );
    } catch (error) {
      throw new ErrorResponse(
        `Can't edit contact with id ${contact._id}. ${error}`,
        error.response.status
      );
    }
  }
}

export const contactService = new ContactService();
