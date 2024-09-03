const { parentPort } = require('worker_threads');
const getRandomDelay = require('../utils/getRandomDelay');

const delay = getRandomDelay();

setTimeout(() => {
  parentPort.postMessage(delay);
}, delay);

