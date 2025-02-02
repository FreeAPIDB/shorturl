// Generate a random short URL
function generateShortURL() {
  return Math.random().toString(36).substring(2, 8); // 6-character random string
}

module.exports = generateShortURL;
