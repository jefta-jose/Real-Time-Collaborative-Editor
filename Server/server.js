import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { disconnect } from 'node:process';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = 5000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//---------------------------------------------
io.on('connection', socket =>{
  console.log("user connected successfully")

  //handle socket events
  socket.on('send-changes', delta=>{
    console.log(delta)
    //broadcast to other users that there are some changes made on the doc
    socket.broadcast.emit('receive-changes', delta)
  })
});