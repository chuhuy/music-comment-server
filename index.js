require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const hpp = require("hpp");

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const options = {};
const io = require("socket.io")(server, options);
const commentSongController = require('./src/controller/comment');

// Allow Cross-Origin requests
app.use(cors());
// Prevent parameter pollution
app.use(hpp());

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on("test", (data) => {
    console.log(data);
  });

  socket.on("join", (song) => {
    socket.join(song);
  });
  socket.on("postComment", (data) => {
    const { comment, song } = data;
    commentSongController(comment.access_token, comment.content, song, comment.created_at);
    socket.broadcast.to(song).emit("postComment", data);
    // socket.to(song).emit("postComment", data);
    // socket.emit("postComment", data);
  });
});

app.get("/", (req, res) => {
  res.send("Music Life Comment Server");
});

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
