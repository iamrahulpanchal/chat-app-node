const socket = io();

socket.on('countUpdated', (count) => {
    console.log(`Count has been Updated. It is ${count}`);
});

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment')
});