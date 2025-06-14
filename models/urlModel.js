const urlStore = [];

function saveUrl(originalUrl, shortCode) {
  const url = { originalUrl, shortCode, createdAt: new Date() };
  urlStore.push(url);
  return url;
}

function findByOriginalUrl(originalUrl) {
  return urlStore.find(url => url.originalUrl === originalUrl);
}

function findByShortCode(shortCode) {
  return urlStore.find(url => url.shortCode === shortCode);
}

module.exports = { saveUrl, findByOriginalUrl, findByShortCode }; 