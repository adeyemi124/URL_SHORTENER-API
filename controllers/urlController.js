// controllers/urlController.js
// Dummy controller for URL Shortener API

const { saveUrl, findByOriginalUrl, findByShortCode } = require('../models/urlModel');
const crypto = require('crypto');

exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: 'longUrl is required' });
  }
  try {
    // Check if URL already exists
    let url = findByOriginalUrl(longUrl);
    if (url) {
      return res.json({ shortCode: url.shortCode, shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}` });
    }
    // Generate a unique short code
    let shortCode;
    let exists = true;
    while (exists) {
      shortCode = crypto.randomBytes(3).toString('base64url'); // 4-5 chars
      exists = findByShortCode(shortCode);
    }
    url = saveUrl(longUrl, shortCode);
    res.json({ shortCode, shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = findByShortCode(shortCode);
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 