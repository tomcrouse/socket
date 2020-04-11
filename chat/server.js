const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
socketio = require('socket.io')
io = socketio(server)
const formatMessage = require('./utils/messages')
const {
    addUser,
    getUser,
    deleteUser,
    getRoomUsers
} = require('./utils/users')
const PORT = process.env.PORT || 3000
const botname = 'bot'



app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    socket.on('join-room', ({
        username,
        room
    }) => {

        const user = addUser(socket.id, username, room)
        console.log(user)
        socket.join(room)

        socket.emit('message', formatMessage(botname, `${user.name} welcome to chat room ${user.room}`))
        socket.broadcast.to(user.room)
            .emit('message', formatMessage(botname, `${user.name} joined room ${user.room}`))

    })
    socket.on('disconnect', () => {
        const user = deleteUser(socket.id)
        console.log(socket.id)
        console.log(user)
        if (user) {
            io.to(user.room)
                .emit('message', formatMessage(botname, `${user.name} has left the room ${user.room}`))
        }
    })
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg))
    })
})

server.listen(PORT, () => console.log('Server is running...'))