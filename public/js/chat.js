const socket = io();

const text_msg = document.querySelector('#text_msg');
const send_msg_btn = document.querySelector('#send_msg');
const share_loc_btn = document.querySelector('#share_location');
const messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

socket.on('locationMessage', (locMessage) => {
    console.log(locMessage);
    const html = Mustache.render(locationTemplate, {
        locLink: locMessage.locLink,
        createdAt: moment(locMessage.createdAt).format('hh:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
});

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
});

send_msg_btn.addEventListener('click', (e) => {
    const data = text_msg.value;
    text_msg.disabled = true;
    send_msg_btn.disabled = true;
    socket.emit('sendMessage', data, (error) => {
        text_msg.disabled = false;
        send_msg_btn.disabled = false;
        text_msg.value = '';
        text_msg.focus();
        if(error){
            return console.log(error);
        }
        console.log(`Message Delivered!`);
    });
});

share_loc_btn.addEventListener('click', (e) => {
    share_loc_btn.disabled = true;
    if(!navigator.geolocation){
        return alert(`Geolocation is not supported by your browser.`);
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            share_loc_btn.disabled = false;
            console.log(`Location Shared!`);
        });
    });
});