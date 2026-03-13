const express = require('express');
const db = require('./db');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('.'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'quiz.html'));
});

// Randomizes and limits to 3 questions based on Category
app.get('/api/questions', (req, res) => {
  const category = req.query.category;
  const sql = 'SELECT * FROM questions WHERE category = ? ORDER BY RAND() LIMIT 3';
  db.query(sql, [category], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});