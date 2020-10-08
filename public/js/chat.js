const socket = io();

socket.on('message', (text) => {
    console.log(text);
})

document.querySelector('#send_msg').addEventListener('click', (e) => {
    const data = document.querySelector('#text_msg').value;
    socket.emit('sendMessage', data);
});
// socket.on('countUpdated', (count) => {
//     console.log(`Count has been Updated. It is ${count}`);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//     socket.emit('increment')
// });