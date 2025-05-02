const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require('./Routes/auth');
const messageRoutes = require('./Routes/message');
const socketIo = require("socket.io");
require("dotenv").config();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URL
const PORT = process.env.PORT || 5000;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://chat-app-nu-gules.vercel.app",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join room
  socket.on("joinRoom", (roomId)=>{
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
// sending message to specific room

  socket.on('sendMessage', ({roomId, message, from}) => {
    const messageData = {
      from,
      message,
      time: new Date().toISOString(),
    };
    // emit to all users in the same room
    io.to(roomId).emit("getMessage", messageData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

