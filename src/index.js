const express = require('express');
const http = require('http');
const path = require('path');
const Filter = require('bad-words');
const socketio = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

io.on('connection', (socket) => {
    console.log(`New WebSocket Connection`);

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({
            id: socket.id,
            username: username,
            room: room
        });

        if(error) {
            return callback(error);
        }

        socket.join(user.room);
        socket.emit('message', generateMessage(`Welcome ${user.username}!`));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has Joined!`));

        callback();
    });

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter();
        if(filter.isProfane(msg)){
            return callback('Profanity is Not Allowed');
        }
        io.to('Test').emit('message', generateMessage(msg));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps/?q=${coords.latitude},${coords.longitude}`));
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', generateMessage(`${user.username} Disconnected`));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on Port : ${PORT}`);
});