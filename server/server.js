const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/DBConfig');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const configureCors = require('./config/CorsConfig');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Initial server setup
const app = express();
// Conenct to MongoDB
connectDB();

// Client req.body parser
app.use(express.json());

// NOTE This sections is for middleware and third party packages - see other 'NOTE' for end of section
// Sanatize requests being sent to DB to prevent NoSQL injections
app.use(mongoSanitize());

// Add extra security headers server response
app.use(helmet());

// Prevent XXS (cross site scripting attacks)
app.use(xss());

// Prevent HTTP parameter pollution attacks
app.use(hpp());

// Enable CORS for whitelisted urls and tell the app to use CORS (see CorsConfig.js for method)
configureCors(app);
// NOTE This is the end of the middleware and third party packages section

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
