import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Contact = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    address: { type: String },
    // city: { type: String },
    // state: { type: String },
    // zip: { type: Number },
    company: { type: String },
    birthdate: { type: String },
    notes: { type: String },
    userId: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Contact;
