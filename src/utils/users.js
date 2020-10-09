const users = [];

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(username === '' || room === ''){
        return {
            error: 'Username & Room are Required!'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    if(existingUser){
        return {
            error: 'Username Already Exists in Room'
        }
    }
    
    const user = { id, username, room }
    users.push(user)
    return { user }
};

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    });

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}


addUser({
    id: 2231,
    username: 'Rahul',
    room: 'TestRoom'
});

addUser({
    id: 2232,
    username: 'bhavin',
    room: 'TestRoom'
});

console.log(users);

const removedUser = removeUser(2231);
console.log(removedUser);
console.log(users);

module.exports = {
    addUser,
}