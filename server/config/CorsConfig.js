const cors = require('cors');

const configureCors = (app) => {
  let whitelist = ['http://localhost:8080', 'http://localhost:8081'];
  let corsOptions = {
    origin: function (origin, callback) {
      let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    },
    credentials: true,
  };
  app.use(cors(corsOptions));
};

module.exports = configureCors;
