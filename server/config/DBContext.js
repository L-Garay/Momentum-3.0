import PhotoSchema from '../models/Photo';
import mongoose from 'mongoose';

class DbContext {
  Photo = mongoose.model('Photos', PhotoSchema);
}

export const dbContext = new DbContext();
