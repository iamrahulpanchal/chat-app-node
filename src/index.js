const express = require('express');
const http = require('http');
const path = require('path');
const Filter = require('bad-words');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

io.on('connection', (socket) => {
    console.log(`New WebSocket Connection`);

    socket.emit('message', 'Welcome to Socket');
    socket.broadcast.emit('message', 'New User Joined');

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter();
        if(filter.isProfane(msg)){
            return callback('Profanity is Not Allowed');
        }
        io.emit('message', msg)
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps/?q=${coords.latitude},${coords.longitude}`);
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on Port : ${PORT}`);
});