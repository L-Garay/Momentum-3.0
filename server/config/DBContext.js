import PhotoSchema from '../models/Photo';
import QuoteSchema from '../models/Quote';
import UserSchema from '../models/User';
import LastUserSchema from '../models/LastUser';
import TodoSchema from '../models/Todo';
import mongoose from 'mongoose';

class DbContext {
  Photo = mongoose.model('Photos', PhotoSchema);
  Quote = mongoose.model('Quote', QuoteSchema);
  // User = mongoose.model('User', UserSchema);
  LastUser = mongoose.model('LastUser', LastUserSchema);
  Todo = mongoose.model('Todo', TodoSchema);
}

export const dbContext = new DbContext();
