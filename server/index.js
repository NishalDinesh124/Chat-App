const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./Routes/auth");
const messageRoutes = require("./Routes/message");

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Database Connection
const uri = process.env.MONGO_URL;
const startServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB Connection Successful");

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/messages", messageRoutes);
  } catch (err) {
    console.log("❌ Mongo connection failed:", err.message);
  }
};
startServer();

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

// Socket.IO
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // Join room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`📦 Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle message
  socket.on("sendMessage", ({ roomId, message, from }) => {
    const messageData = {
      from,
      message,
      time: new Date().toISOString(),
    };
    io.to(roomId).emit("getMessage", messageData);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

