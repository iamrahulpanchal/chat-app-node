const socket = io();

socket.on('message', (text) => {
    console.log(text);
})

document.querySelector('#send_msg').addEventListener('click', (e) => {
    const data = document.querySelector('#text_msg').value;
    socket.emit('sendMessage', data, (error) => {
        if(error){
            return console.log(error);
        }
        console.log(`Message Delivered!`);
    });
});

document.querySelector('#share_location').addEventListener('click', (e) => {
    if(!navigator.geolocation){
        return alert(`Geolocation is not supported by your browser.`);
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log(`Location Shared!`);
        });
    });
});