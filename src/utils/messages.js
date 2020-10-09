const generateMessage = (username, text) => {
    return {
        text: text,
        createdAt: new Date().getTime(),
        username: username
    }
}

const generateLocationMessage = (username, locLink) => {
    return {
        locLink: locLink,
        createdAt: new Date().getTime(),
        username: username
    }
}

module.exports = {
    generateMessage: generateMessage,
    generateLocationMessage: generateLocationMessage
}