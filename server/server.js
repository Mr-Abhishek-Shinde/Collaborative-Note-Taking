require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const notesRoutes = require("./routes/note");
const messageRoutes = require("./routes/message");
const todoRoutes = require("./routes/todo");

const app = express();

app.use(express.json());
app.use(cors());

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/note", notesRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/todo", todoRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
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


// Discussion (Chat) Websocket Connection:
const http = require('http');
const { Server } = require('socket.io');

// Express app setup
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3000"],

    methods: ["GET", "POST"],
  },
});

// Define a map to store socket connections by room
const roomSockets = new Map();

io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('join room', (roomId) => {
      // Join the provided room
      socket.join(roomId);
      
      // Store the socket connection in the roomSockets map
      if (!roomSockets.has(roomId)) {
        roomSockets.set(roomId, new Set());
      }
      roomSockets.get(roomId).add(socket);
      
      console.log(`User joined room ${roomId}`);
    });
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
      // Remove socket from all rooms it joined
      roomSockets.forEach((sockets, roomId) => {
        if (sockets.has(socket)) {
          sockets.delete(socket);
          console.log(`User disconnected from room ${roomId}`);
        }
      });
    });
  
    socket.on('chat message', (data) => {
      console.log('message: ' + JSON.stringify(data));
      const { roomId, user, text } = data;
      
      // Emit the message to all sockets in the room
      io.to(roomId).emit('chat message', {user: user, text: text});
    });
});

// Start the server
const PORT = process.env.DISCUSS_SOCKET_PORT || 5000;
server.listen(PORT, 'localhost', () => {
  console.log(`Discussion Server running on port ${PORT}`);
});