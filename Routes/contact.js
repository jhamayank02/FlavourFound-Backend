const express = require('express');
const router = express.Router();

const { query } = require('../controllers/contact');

router.post('/query', query);

module.exports = router;
