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
    console.log('edit', contact);
    try {
      return await dbContext.Contact.replaceOne({ _id: contact._id }, contact);
    } catch (error) {
      throw new ErrorResponse(
        `Can't edit contact with id ${contact._id}. ${error}`,
        error.response.status
      );
    }
  }
  // NOTE See below
  // NOTE For some reason, the '$unset' operator for the 'update' operation is not functioning as expected. It isn't doing anything, which according to the MongoDB docs is the intended action when the field that is being passed in, does not exist. However, if you look in the collections in the MongoDB desktop application for this project, you can clearly see that a combination of the different field names (lastName,phone, email, birthdate, company, address and notes) are all present on a Contact document.
  // NOTE The only condition that is being checked, is what field specifically to remove. Hence the switch statement, which switches on the filed name, which was being passed in as a seperate property of the 'combined' object.  Within the switch, we are trying to match a document's _id in the Contact collection with the _id of the contact we want to remove the field from.  Again, if you look at the documents in the collection in the DB, and find the document you are trying to modify, you can clearly see that the _id's do in fact match; however nothing actually gets modified.  This leads me to believe that the problem lies somewhere within the  {$unset: {fieldName: ""}} section.
  // NOTE However, if you look at the docs for the $unset operator (found here --> https://docs.mongodb.com/manual/reference/operator/update/unset/#up._S_unset), you can see that you should be able to just specify an optional criteria and then the field name to remove from the object(s) that matcht the criteria.  This is exactly what I am doing below; I am setting the criteria to look for an _id match (which you can clearly see for yourself that they do), and the I'm $unsetting the appropriate field (based on the switch statement's case, which is determined by the 'fieldToRemove' property of the 'combined' object).
  // NOTE However, no errors are thrown and no actuall modifications are made to any documents in the DB. Since, no errors are thrown, this is what leads me to believe that the designated behavior of not doing anything when the field supposedlly doesn't exist is kicking in. I'm almost certain it's not the criteria _id check, because again you can look at the _id being passed into the function, and then look manually in the DB collection and find the corresponding _id.  I've checked the model and schema for 'Contact' and it does have all the necessary field/properties on it; and the only ones that are required are the firstName and userId properties, but those aren't even an option to delete; so none of the properties that are listed below are reqiured.
  // NOTE Every single StackOverflow post had the same exact answers, basically they were all slight variations of the same configuration, just with different variable and collection names. For example, some had {mulit: true} because they wanted to remove the fields from all matching docs, some had  upsert() in them in case there was no match, but the syntax for the actual $unset was all the same. Every other random site basically just regurgitated the MongoDB docs.
  // TODO So my workaround was to just send the old contact's id along with the updated contact without the field to the deleteProperty() method and then within there just use the findByIdAndDelete() method to remove the old contact, and then replace it with the create() method using the new updated contact. I don't particularly like this method, as it could be considered resource heavy as the method is actually performing two DB operations; however, given that $unset doesn't appear to be working for me, this is my workaround for now.
  // NOTE *************SEE BELOW*****************
  // So I didn't like the method I described above at all so I searched some more online and found the 'replaceOne' operation, which I have not seen before. Turns out, it does basically exactly what I want, even more so than the $unset operator actually.  Now I have configured the client side so that any modifications (editing and deleting right now) don't actually occur to the DB until the user clicks the 'confirm' button. The only changes the user will see is that the text will change color and display a preview of what the edited field would look like; if they delete a field, the text will turn red, if they edit a field the text will turn gold and the new value will show.  It isn't until they hit the confirm button that the fields are actually removed from the 'newContact' object (the one that holds the changes until it's ready to be sent to the DB), and then sent to the DB.  By manipulating a local (within the component) variable, this will allow the user to make as many changes as they want and then only make one database call; instead of deleting the old contact and then recreating it, we are just replacing it.
  // async deleteProperty(combined) {
  //   try {
  //     console.log('from service', combined);
  //     switch (combined.fieldToRemove) {
  //       case 'lastName':
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { lastName: '' } }
  //         );
  //         break;
  //       case 'phone':
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { phone: '' } }
  //         );
  //         break;
  //       case 'email':
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { email: '' } }
  //         );
  //         break;
  //       case 'address':
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { address: '' } }
  //         );
  //         break;
  //       case 'company':
  //         console.log('hit company');
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { company: '' } }
  //         );
  //         break;
  //       case 'birthdate':
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { birthdate: '' } }
  //         );
  //         break;
  //       case 'notes':
  //         dbContext.Contact.update(
  //           { _id: combined.contact._id },
  //           { $unset: { notes: '' } }
  //         );
  //         break;

  //       default:
  //         throw new ErrorResponse(
  //           `The 'fieldToRemove' of ${fieldToRemove} does not match any fields on the object.`,
  //           500
  //         );
  //     }
  //   } catch (error) {
  //     throw new ErrorResponse(
  //       `Can't delete the property from contact with id ${contact._id}. ${error}`,
  //       error.response.status
  //     );
  //   }
  // }
}

export const contactService = new ContactService();
