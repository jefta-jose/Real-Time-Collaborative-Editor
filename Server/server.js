import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import mongoose from 'mongoose'
import DocumentSchema from './documents.js'

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost/real-time-docs')

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

const defaultValue = ''

//---------------------------------------------
io.on('connection', socket =>{
  console.log("user connected successfully")

  //get document event 
  socket.on('get-document', async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit('load-document', document.data)

      //handle socket events
  socket.on('send-changes', delta=>{
    console.log(delta)
    //broadcast to other users that there are some changes made on the doc
    socket.broadcast.to (documentId).emit('receive-changes', delta)
  })

  socket.on('save-document', async data => {
    await DocumentSchema.findByIdAndUpdate(documentId, {data})
  })

  })
});

const findOrCreateDocument = async(id) => {
  if(id == null) return null

  const document = await DocumentSchema.findById(id)

  if(document) return document

  return await DocumentSchema.create({_id:id, data: defaultValue})
}