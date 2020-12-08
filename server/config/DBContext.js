import PhotoSchema from '../models/Photo';
import QuoteSchema from '../models/Quote';
import UserSchema from '../models/User';
import LastUserSchema from '../models/LastUser';
import TodoSchema from '../models/Todo';
import TodoListSchema from '../models/TodoList';
import mongoose from 'mongoose';

class DbContext {
  Photo = mongoose.model('Photos', PhotoSchema);
  Quote = mongoose.model('Quote', QuoteSchema);
  // User = mongoose.model('User', UserSchema);
  LastUser = mongoose.model('LastUser', LastUserSchema);
  Todo = mongoose.model('Todo', TodoSchema);
  TodoList = mongoose.model('TodoList', TodoListSchema);
}

export const dbContext = new DbContext();
