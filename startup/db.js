const mongoose = require('mongoose');
const logger = require('./logger'); // Make sure to import the logger

module.exports = function () {
  mongoose.connect('mongodb://localhost/vidly')
    .then(() => logger.info("Connected to MongoDB")) // Use the configured logger
    .catch(err => logger.error('Error connecting to MongoDB', err)); // Log any connection errors
};

