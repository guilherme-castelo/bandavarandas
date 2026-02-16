const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const port = process.env.PORT || 3131;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// JSON Server setup
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

// Use defaults (logger, static, cors and no-cache)
app.use(middlewares);

// Mount JSON Server on /api
app.use('/api', router);

// Fallback to index.html for unknown routes (classic SPA behavior, though mostly static here)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
