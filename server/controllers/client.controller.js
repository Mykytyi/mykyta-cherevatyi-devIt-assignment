const { getRandomDelay } = require('../utils/getRandomDelay');

class ClientController {
  async start(req, res, next) {
    const { index } = req.body;
    const delay = getRandomDelay();

    setTimeout(() => {
      res
        .status(200)
        .json({ message: `Got index: ${index}` });
    }, delay);
  }
}

module.exports = new ClientController();
