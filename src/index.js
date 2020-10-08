const express = require('express');
const http = require('http');
const path = require('path');
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

    socket.on('sendMessage', (msg) => {
        io.emit('message', msg)
    });

    socket.on('sendLocation', (coords) => {
        io.emit('message', `Lat : ${coords.latitude}, Lon : ${coords.longitude}`);
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on Port : ${PORT}`);
});