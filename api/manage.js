// API endpoint to manage (delete or view) shortened URLs
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
  const db = loadDb();

  if (req.method === 'GET') {
    // Return the list of all shortened URLs
    return res.status(200).json(db);
  }

  if (req.method === 'DELETE') {
    const { shortUrl } = req.body;
    if (!shortUrl || !db[shortUrl]) {
      return res.status(404).json({ message: 'Short URL not found' });
    }
    delete db[shortUrl];
    saveDb(db);
    return res.status(200).json({ message: 'URL deleted' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
