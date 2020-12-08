import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TodoList = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
    todos: { type: Array, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default TodoList;
