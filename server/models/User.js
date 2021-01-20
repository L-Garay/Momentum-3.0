import mongoose from 'mongoose';
import Photo from './Photo';
import Quote from './Quote';
import Todo from './Todo';
import TodoList from './TodoList';
const Schema = mongoose.Schema;
const _photoRepo = mongoose.model('Photo', Photo);
const _quoteRepo = mongoose.model('Quote', Quote);
const _todoRepo = mongoose.model('Todo', Todo);
const _todoListRepo = mongoose.model('List', TodoList);

const UserSchema = new mongoose.Schema(
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

// Cascade delete all photos and quotes saved by a particular user, when that user gets deleted from DB
UserSchema.pre('remove', async function () {
  console.log(`Should delete photos and quotes with userId ${this._id}`);
  await _photoRepo.deleteMany({ userId: this._id });
  await _quoteRepo.deleteMany({ userId: this._id });
  await _todoRepo.deleteMany({ userId: this._id });
  await _todoListRepo.deleteMany({ userId: this._id });
});

const User = mongoose.model('User', UserSchema);
export default User;
