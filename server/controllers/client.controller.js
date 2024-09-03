const { Worker } = require('worker_threads');
const path = require('path');

class ClientController {
  async start(req, res, next) {
    const { index } = req.body;

    const worker = new Worker(path.resolve(__dirname, '../threads/delay.thread.js'));
    worker.on('message', (val) => {
      res.status(200).json({ data: index });
    });
  }
}

module.exports = new ClientController();
