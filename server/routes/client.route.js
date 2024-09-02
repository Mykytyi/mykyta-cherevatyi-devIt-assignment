const { Router } = require('express');
const controller = require('../controllers/client.controller');
const validator = require('../validators/client.validator');

const router = Router();

router.post('/api', validator.start, controller.start);

module.exports = router;
