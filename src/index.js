const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

const displayMessage = 'Welcome!'

io.on('connection', (socket) => {
    console.log('New Connection Setup')
    
    socket.emit('clientmessage', displayMessage)

    socket.on('userSubmit', (message) => {
        io.emit('clientmessage', message)
    })
})

server.listen(port, () => {
    console.log('Server is up and running on port', port)
})