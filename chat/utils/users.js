const users = []

const addUser = (id, name, room) => {
    const user = {
        id,
        name,
        room
    }
    users.push(user)
    return user
}

const getUser = id => {
    users.find(user => id === user.id)
}

const deleteUser = id => {
    const index = users.findIndex(user => id === user.id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getRoomUsers = room => {
    return users.filter(user => user.room === room)
}

module.exports = {
    addUser,
    getUser,
    deleteUser,
    getRoomUsers
}