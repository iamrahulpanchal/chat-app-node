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

app.get('/', (req, res) => {
    res.send(`Hello Chat`)
})

server.listen(PORT, () => {
    console.log(`Server is up on Port : ${PORT}`);
});