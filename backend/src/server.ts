import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createRoom, joinRoom } from './rooms';
import { Room } from './types';

const BASE_URL = 'http://localhost:3000'; // process.env.BASE_URL;
const app = express();
/**
 * Creates an HTTP server instance using the Express application.
 * This server instance is used to handle incoming HTTP requests and responses.
 */
const server = http.createServer(app);
/**
 * Initializes a new Socket.IO server instance that is bound to the Express HTTP server.
 * This allows real-time, bidirectional communication between the client and server.
 * The server is configured to only allow connections from the 'http://localhost:3000' origin,
 * and to only accept GET and POST HTTP methods.
 */
const io = new Server(server, {
  cors: {
    origin: BASE_URL, // Allow only your frontend origin
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors({ origin: BASE_URL, credentials: true }));

 /**
 * Endpoint to start a new game
 * @route POST /start-game
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - Username of the player starting the game
 * @param {Object} res - Express response object
 * @returns {Room} JSON response containing the created room details
 */
app.post('/start-game', (req, res) => {
  const { username } = req.body;
  const room: Room = createRoom(username);
  res.json(room);
});

/**
 * Endpoint to allow a player to join an existing game room.
 * @route POST /join-game
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - Username of the player joining the game
 * @param {string} req.body.roomId - ID of the room the player wants to join
 * @param {Object} res - Express response object
 * @returns {Room} JSON response containing the joined room details, or a 404 error if the room is not found or full
 */
app.post('/join-game', (req, res) => {
  const { username, roomId } = req.body;
  const room = joinRoom(roomId, username);
  if (room) {
    // io.to(roomId).emit('opponentJoined', { username, ev: 'opponentJoined' }); // TODO not working
    // notify starter that opponent has joint
    io.emit('opponentJoined', { roomId, username }); // TODO doesnt create multiple rooms
    // send room to opponent
    res.json(room);
  } else {
    res.status(404).json({ message: 'Room not found or full' });
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
