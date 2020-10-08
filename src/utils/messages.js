const generateMessage = (text) => {
    return {
        text: text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (locLink) => {
    return {
        locLink: locLink,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage: generateMessage,
    generateLocationMessage: generateLocationMessage
}