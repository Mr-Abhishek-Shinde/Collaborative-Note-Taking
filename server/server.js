require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

app.use(cors());

const http = require('http').createServer(app);
const { Server } = require("socket.io");

app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Optional: specify allowed HTTP methods
  },
});

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
    data = newData; // Update server-side data
    // Broadcast the updated data to all connected clients
    io.emit("update-data", data);
  });
});

http.listen(5000, () => {
  console.log("Server listening on port 5000");
});
