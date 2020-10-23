import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import { RegisterControllers, Paths } from '../../Setup';
import errorHandler from '../middleware/Error';

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
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(mongoSanitize());
    app.use(xss());
    app.use(hpp());
    app.use(errorHandler);
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
    // NOTE Default Error Handler
    app.use((error, req, res, next) => {
      if (!error.status) {
        error.status = 400;
      }
      if (error.status == 500) {
        console.error(error); // should write to external
      }
      res.status(error.status).send({ ...error, url: req.url });
    });
  }
}