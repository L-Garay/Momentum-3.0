import mongoose from 'mongoose';
import Photo from './Photo';
import Quote from './Quote';
import Todo from './Todo';
const Schema = mongoose.Schema;
const _photoRepo = mongoose.model('Photo', Photo);
const _quoteRepo = mongoose.model('Quote', Quote);
const _todoRepo = mongoose.model('Todo', Todo);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    militaryTimeSelected: { type: Boolean, required: true },
    createdTodoLists: { type: Array, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Cascade delete all photos and quotes saved by a particular user, when that user gets deleted from DB
UserSchema.pre('remove', async function () {
  console.log(`Should delete photos and quotes with userId ${this._id}`);
  await _photoRepo.deleteMany({ userId: this._id });
  await _quoteRepo.deleteMany({ userId: this._id });
  await _todoRepo.deleteMany({ userId: this._id });
});

const User = mongoose.model('User', UserSchema);
export default User;
