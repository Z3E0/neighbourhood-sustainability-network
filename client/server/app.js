// server/app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Database Connection
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

