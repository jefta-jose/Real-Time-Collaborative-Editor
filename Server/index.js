import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser'

import {createServer } from "http";
import { Server } from "socket.io";

import userRouter from "./Routes/userRoutes.js";

// Initialize environment variables
dotenv.config();

const app = express();

// socketIO set up
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use(`/api`, userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);