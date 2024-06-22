// server/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/database');

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

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  console.log('Received login request:', req.body); // Log the received request body
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in user:', err);
      res.status(500).send('Server error');
      return;
    }
    console.log('Query results:', results); // Log the query results
    if (results.length > 0) {
      res.status(200).send('User logged in successfully');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


