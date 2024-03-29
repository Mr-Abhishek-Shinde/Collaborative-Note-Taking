require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const notesRoutes = require("./routes/note");

const app = express();

app.use(express.json());
app.use(cors());

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/note", notesRoutes);

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
const connection = shareDBServer.connect();

const doc = connection.get("documents", "firstDocument");

doc.fetch(function (err) {
  if (err) throw err;
  if (doc.type === null) {
    doc.create([{ insert: "Hello World!" }], "rich-text", () => {
      const wss = new WebSocket.Server({ host: "127.0.0.1", port: 8080 });

      wss.on("connection", function connection(ws) {
        const jsonStream = new WebSocketJSONStream(ws);
        shareDBServer.listen(jsonStream);
      });
    });
    return;
  }
});
