const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const port = process.env.PORT || 5000;

io.on('connection', socket => {
    console.log(socket.id)
    socket.on("private message", (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit("private message", socket.id, msg);
      });
});

app.get('/', (req, res) => {
    res.send("Music Life Comment Server");
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// const express = require('express');
// const cors = require('cors');
// const hpp = require('hpp');
// const dotenv = require('dotenv').config();
// const bodyParser = require('body-parser');

// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send("Music Life Comment Server");
// });

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     socket.on('1', (msg) => {
//         console.log('message: ' + msg);
//     });
//     socket.emit("broadcast", "hello friends!");
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// })

// http.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

