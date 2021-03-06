import mongoose from 'mongoose';

export default class DbConnection {
  static connectDB = async () => {
    try {
      const connection = await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };
}
