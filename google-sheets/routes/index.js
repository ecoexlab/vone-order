const express = require('express');
const router = express.Router();

const {getOrder} = require('../controllers/order.js');

router.post('/api/order', getOrder);

module.exports = router;