const socket = io();

socket.on('message', (text) => {
    console.log(text);
})

document.querySelector('#send_msg').addEventListener('click', (e) => {
    const data = document.querySelector('#text_msg').value;
    socket.emit('sendMessage', data);
});