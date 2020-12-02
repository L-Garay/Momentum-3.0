import mongoose from 'mongoose';
import Photo from './Photo';
import Quote from './Quote';
const Schema = mongoose.Schema;
const _photoRepo = mongoose.model('Photo', Photo);
const _quoteRepo = mongoose.model('Quote', Quote);

const User = new Schema(
  {
    name: { type: String, required: true },
    militaryTimeSelected: { type: Boolean, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// User.post('findByIdAndDelete', function (next) {
//   Promise.all([
//     _photoRepo.deleteMany({ userId: this._conditions._id }),
//     _quoteRepo.deleteMany({ userId: this._conditions._id }),
//   ])
//     .then(() => next())
//     .catch((err) => next(err));
// });

export default User;
