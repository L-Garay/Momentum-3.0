import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import { RegisterControllers, Paths } from '../../Setup';
import ErrorResponse from '../utils/ErrorResponse';

export default class Startup {
  static ConfigureGlobalMiddleware(app) {
    // NOTE Configure and Register Middleware
    let whitelist = ['http://localhost:8080'];
    let corsOptions = {
      origin: function (origin, callback) {
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
      },
      credentials: true,
    };
    app.use(helmet()); // Sets various HTTP headers for security
    app.use(cors(corsOptions)); // Allow other domains/ports access to server
    app.use(express.json()); // Allow express to deal with incoming request objects as json objects
    app.use(mongoSanitize()); // Prevent users from injecting their own MongoDB querries and it being run on the server
    app.use(xss()); // Prevent cross-site scripting code injections
    app.use(hpp()); // Protect agains HTTP parameter pollution
    // app.use(errorHandler); // Custom error handler
  }
  static ConfigureRoutes(app) {
    let router = express.Router();
    RegisterControllers(router);
    app.use(router);

    app.use('', express.static(Paths.Public));
    Startup.registerErrorHandlers(app);
  }

  static registerErrorHandlers(app) {
    // NOTE SEND 404 for any unknown routes
    app.use(
      '*',
      (_, res, next) => {
        res.status(404);
        next();
      },
      express.static(Paths.Public + '404')
    );
    app.use((err, req, res, next) => {
      let error = { ...err };
      error.message = err.message;

      // Mongoose bad ObjectId
      if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
      }

      // Mongoose duplicate key error
      if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
      }

      // Mongoose validation error (missing fields)
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        // since there could be multiple missing fields/validation errors which have multiple key:value pairs, we can't assign all of them to one object.  Therefore we have to extract just the error messages. To do this we have to take just the values of all the errors..and then map over all the values and grab just the messages.
        error = new ErrorResponse(message, 400);
      }

      res
        .status(error.status || 500)
        .send({ success: false, error: error.message || 'Server Error' });
    });
    // // NOTE Default Error Handler
    // app.use((error, req, res, next) => {
    //   if (!error.status) {
    //     error.status = 400;
    //   }
    //   if (error.status == 500) {
    //     console.error(error); // should write to external
    //   }
    //   res.status(error.status).send({ ...error, url: req.url });
    // });
  }
}
