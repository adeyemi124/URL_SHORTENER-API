const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// POST /shorten
router.post('/shorten', urlController.shortenUrl);

// GET /:shortCode
router.get('/:shortCode', urlController.redirectUrl);

module.exports = router; 