import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LastUser = new Schema(
  {
    name: { type: String, required: true },
    militaryTimeSelected: { type: Boolean, required: true },
    calculatorSelected: { type: Boolean, required: true },
    newsSelected: { type: Boolean, required: true },
    gamesSelected: { type: Boolean, required: true },
    createdTodoLists: { type: Array, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default LastUser;
