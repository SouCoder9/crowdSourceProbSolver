// server.js
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('newSolution', (solution) => {
    io.emit('solutionAdded', solution); // Broadcast to all clients
  });
});

// In your solution controller:
const Solution = require('../models/Solution');
exports.createSolution = async (req, res) => {
  try {
    const solution = await Solution.create(req.body);
    io.emit('solutionAdded', solution); // Trigger WebSocket event
    res.status(201).json(solution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post solution' });
  }
};

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problem'));
app.use('/api/solutions', require('./routes/solution'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));