// API endpoint to shorten a URL
const { v4: uuidv4 } = require('uuid');
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

// Save the database
function saveDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const db = loadDb();
    const shortUrl = uuidv4().slice(0, 6); // Generate a unique 6-character short URL
    db[shortUrl] = url;
    saveDb(db);

    return res.status(200).json({ shortUrl });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
