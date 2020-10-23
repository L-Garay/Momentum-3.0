import PhotoSchema from '../models/Photo';
import QuoteSchema from '../models/Quote';
import mongoose from 'mongoose';

class DbContext {
  Photo = mongoose.model('Photos', PhotoSchema);
  Quote = mongoose.model('Quote', QuoteSchema);
}

export const dbContext = new DbContext();
