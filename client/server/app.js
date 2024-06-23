// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connection = require('./config/database');
// const http = require('http');
// const configureSocket = require('./socket');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const postalGroups = require('./postalGroups'); // Import the postal groups

// const app = express();
// const server = http.createServer(app);
// const io = configureSocket(server);

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Fetch all users
// app.get('/api/users', (req, res) => {
//   const query = 'SELECT * FROM users';
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching users:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results);
//   });
// });

// // Fetch a user by ID
// app.get('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM users WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching user:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results[0]);
//   });
// });

// app.post('/api/auth/register', async (req, res) => {
//   const { username, email, password, postal } = req.body;
//   const firstTwoDigits = postal.slice(0, 2);
//   const group = postalGroups[firstTwoDigits] || 'Unknown';

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const query = 'INSERT INTO users (username, email, password, postal) VALUES (?, ?, ?, ?)';
//     connection.query(query, [username, email, hashedPassword, postal], (err, results) => {
//       if (err) {
//         console.error('Error inserting user:', err);
//         res.status(500).send('Server error');
//         return;
//       }
//       const token = jwt.sign({ id: results.insertId }, 'your_jwt_secret', { expiresIn: '1h' });
//       res.status(201).send({ message: 'User registered successfully', group, token });
//     });
//   } catch (err) {
//     console.error('Error hashing password:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Login endpoint
// app.post('/api/auth/login', (req, res) => {
//   const { email, password } = req.body;
//   const query = 'SELECT * FROM users WHERE email = ?';
//   connection.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error('Error logging in user:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     if (results.length > 0) {
//       const user = results[0];
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         const firstTwoDigits = user.postal.slice(0, 2);
//         const group = postalGroups[firstTwoDigits] || 'Unknown';
//         const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
//         res.status(200).send({ message: 'User logged in successfully', group, token });
//       } else {
//         res.status(401).send('Invalid credentials');
//       }
//     } else {
//       res.status(401).send('Invalid credentials');
//     }
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const postalGroups = require('./postalGroups'); // Import the postal groups

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Henrry070506!',
  database: 'neighbourhood_sustainability'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Socket.io handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinGroup', (group) => {
    socket.join(group);
    console.log(`Client joined group ${group}`);
    
    // Send existing messages for the group to the client
    const query = 'SELECT messages.message, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE group_name = ? ORDER BY timestamp';
    connection.query(query, [group], (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
      } else {
        socket.emit('loadMessages', results);
      }
    });
  });

  socket.on('chatMessage', ({ group, message, user_id }) => {
    const query = 'INSERT INTO messages (user_id, group_name, message) VALUES (?, ?, ?)';
    connection.query(query, [user_id, group, message], (err, results) => {
      if (err) {
        console.error('Error inserting message:', err);
      } else {
        const msg = { message, username: socket.username }; // Emit the message with username
        io.to(group).emit('chatMessage', msg);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

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

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, postal } = req.body;
  const firstTwoDigits = postal.slice(0, 2);
  const group = postalGroups[firstTwoDigits] || 'Unknown';

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO users (username, email, password, postal) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, email, hashedPassword, postal], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Server error');
        return;
      }
      const token = jwt.sign({ id: results.insertId }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(201).send({ message: 'User registered successfully', group, token, user_id: results.insertId });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Server error');
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error logging in user:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length > 0) {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const firstTwoDigits = user.postal.slice(0, 2);
        const group = postalGroups[firstTwoDigits] || 'Unknown';
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).send({ message: 'User logged in successfully', group, token, user_id: user.id });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
