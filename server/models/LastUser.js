import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LastUser = new Schema(
  {
    name: { type: String, required: true },
    createdTodoLists: { type: Array, required: true },
    contacts: { type: Array, required: true },
    selected: { type: Object, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default LastUser;
