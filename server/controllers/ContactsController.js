import BaseController from '../utils/BaseController';
import { contactService } from '../services/ContactService';

export class ContactsController extends BaseController {
  constructor() {
    super('api/contacts');
    this.router.post('', this.createContact).delete('/:id', this.deleteContact);
  }

  async createContact(req, res, next) {
    try {
      let data = await contactService.createContact(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteContact(req, res, next) {
    try {
      await contactService.deleteContact(req.params.id);
      return res.status(200).send('Successfully Deleted');
    } catch (error) {
      next(error);
    }
  }
}
