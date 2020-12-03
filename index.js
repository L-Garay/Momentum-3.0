// This is the configuration for the package esm, which is a package that allows us to use import/export in the server
require = require('esm')(module);
module.exports = require('./server/main.js');
