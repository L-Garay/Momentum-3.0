const express = require('express');
const dotenv = require('dotenv');
import DBConfig from './config/DBConfig';
import Startup from './config/StartupConfig';

// // Load environment variables
dotenv.config();
// NOTE I had to move the .env file to the top level, because for some reason I couldn't access process.env.whatever when the .env file was within the config folder.  So moved it out, renamed the folder to db and just called the file .env
// dotenv.config({ path: './config/config.env' });

// Initial server setup
const app = express();

Startup.ConfigureGlobalMiddleware(app);
Startup.ConfigureRoutes(app);

// Conenct to MongoDB
DBConfig.connectDB();

// Starting up the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`The error is: ${err}`);
  // close the server and exit process
  server.close(() => process.exit(1));
});
