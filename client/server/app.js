// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Fetch a user by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results[0]);
  });
});

app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('User registered successfully');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


