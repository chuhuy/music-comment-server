const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Music Life Comment Server");
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('1', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

http.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});