require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');

const userRoutes = require("./routes/user");
const notesRoutes = require("./routes/note");
const messageRoutes = require("./routes/message");
const todoRoutes = require("./routes/todo");
const summarizeTextRoutes = require("./routes/summarize");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Discussion (Chat) Websocket Connection
const roomSockets = new Map();

io.on('connection', (socket) => {
    socket.on('join room', (roomId) => {
      socket.join(roomId);
      if (!roomSockets.has(roomId)) {
        roomSockets.set(roomId, new Set());
      }
      roomSockets.get(roomId).add(socket);
      console.log(`User joined room ${roomId}`);
    });
    
    socket.on('disconnect', () => {
      roomSockets.forEach((sockets, roomId) => {
        if (sockets.has(socket)) {
          sockets.delete(socket);
          console.log(`User disconnected from room ${roomId}`);
        }
      });
    });
  
    socket.on('chat message', (data) => {
      const { roomId, user, text } = data;
      io.to(roomId).emit('chat message', {user: user, text: text});
    });
});

// Define API routes
app.use("/api/user", userRoutes);
app.use("/api/note", notesRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/summarize", summarizeTextRoutes);

// Start the combined server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server and WebSocket running on port ${PORT}`);
});


// WEBSOCKET CONNECTION:

const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const ShareDB = require("sharedb");

ShareDB.types.register(require("rich-text").type);

const shareDBServer = new ShareDB();

const createWebSocketServer = (roomId) => {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on("connection", function connection(ws) {
    const jsonStream = new WebSocketJSONStream(ws);
    const connection = shareDBServer.connect();
    const doc = connection.get("documents", roomId);
    doc.fetch(function (err) {
      if (err) throw err;
      if (doc.type === null) {
        doc.create([{ insert: "Hello World!" }], "rich-text", () => {
          shareDBServer.listen(jsonStream);
        });
        return;
      }
      shareDBServer.listen(jsonStream);
    });
  });

  return wss;
};

const httpServer = require("http").createServer();
httpServer.listen(8080);

httpServer.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = new URL(request.url, "http://localhost:8080");
  const roomId = pathname.slice(1);

  const wss = createWebSocketServer(roomId);
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});