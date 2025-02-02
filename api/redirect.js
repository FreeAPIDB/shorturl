// API endpoint to redirect short URL to long URL
const fs = require('fs');
const path = require('path');
const dbPath = path.resolve('./utils/db.json');

// Utility to load the database
function loadDb() {
  if (fs.existsSync(dbPath)) {
    return JSON.parse(fs.readFileSync(dbPath));
  }
  return {};
}

module.exports = async (req, res) => {
  const { shortUrl } = req.query;
  const db = loadDb();

  if (!shortUrl || !db[shortUrl]) {
    return res.status(404).json({ message: 'Short URL not found' });
  }

  return res.redirect(db[shortUrl]);
};
