const winston = require('winston');
require('winston-mongodb'); // Include this only if you're using MongoDB transport
require('express-async-errors');

// Create and configure the logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({colorize : true , prettyPrint : true}), // Log to console
    new winston.transports.File({ filename: 'logfile.log' }), // Log to file
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      level: 'error', // Log only error level messages to MongoDB
     
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'unhandledRejections.log' })
  ]
});

module.exports = logger;
