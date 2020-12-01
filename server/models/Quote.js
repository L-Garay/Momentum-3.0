import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Quote = new Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Quote;
