import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Todo = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Todo;
