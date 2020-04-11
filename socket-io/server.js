const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express();
const server = require('http').createServer(app)
const PORT = 3000 || process.env.PORT
const io = require('socket.io')(server)

app.use(express.static('public'))

io.on('connection', socket => {
    socket.on('new-user', (name) => {
        socket.broadcast.emit('greeting', name)
    })

    console.log('User is connected')
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log(msg)
        io.emit('message', msg)
    })
})

server.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))