import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Photo = new Schema(
  {
    id: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    urls: {
      fullUrl: { type: String, required: true },
      regular: { type: String, required: true },
      thumbUrl: { type: String, required: true },
    },
    download_location: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    unsplashLink: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Photo;
