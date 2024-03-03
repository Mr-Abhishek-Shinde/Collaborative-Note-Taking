require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/user");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);

let data = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Start Typing...",
        level: 1,
      },
    },
  ],
};

io.on("connection", (socket) => {
  // Send initial data to the client
  socket.emit("update-data", data);

  // Listen for data changes from clients
  socket.on("data-change", (newData) => {
    data = newData;
    // Broadcast the updated data to all connected clients
    io.emit("update-data", data);
  });
});

// connect to db and start the server
mongoose.connect(process.env.MONGO_URI).then(() => {
  httpServer.listen(process.env.PORT || 4000, () => {
    console.log("Server listening on port", process.env.PORT || 4000);
  });
}).catch((err) => {
  console.error("Error connecting to the database:", err);
});
