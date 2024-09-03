const { MAX_REQUESTS, TIME_WINDOW } = require('../constants');

let requestCounts = {};

class ClientValidator {
  async start(req, res, next) {
    try {
      const { index } = req.body;

      if (!index) {
        next('Index was not provided');
      }

      const currentTime = Date.now();
      const userIP = req.ip; // Track requests per IP address

      if (!requestCounts[userIP]) {
        requestCounts[userIP] = [];
      }

      console.log('Index: ', index);
      console.log('requestCounts: ', requestCounts[req.ip].length);

      // Filter out requests older than the time window
      requestCounts[userIP] = requestCounts[userIP].filter(
        (timestamp) => currentTime - timestamp < TIME_WINDOW
      );

      // Check if more than 50 requests have been made within the time window
      if (requestCounts[userIP].length >= MAX_REQUESTS) {
        return res.status(429).json({ message: 'Too many requests - please try again later.' });
      }

      // Record the current request timestamp
      requestCounts[userIP].push(currentTime);

      next();
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new ClientValidator();
