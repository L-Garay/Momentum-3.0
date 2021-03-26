import mongoose from 'mongoose';
import Photo from './Photo';
import Quote from './Quote';
import Todo from './Todo';
import TodoList from './TodoList';
import Contact from './Contact';
const Schema = mongoose.Schema;
const _photoRepo = mongoose.model('Photo', Photo);
const _quoteRepo = mongoose.model('Quote', Quote);
const _todoRepo = mongoose.model('Todo', Todo);
const _todoListRepo = mongoose.model('List', TodoList);
const _contactRepo = mongoose.model('Contact', Contact);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    createdTodoLists: { type: Array, required: true },
    contacts: { type: Array, required: true },
    selected: { type: Object, required: true },
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
  await _contactRepo.deleteMany({ userId: this._id });
});

const User = mongoose.model('User', UserSchema);
export default User;
