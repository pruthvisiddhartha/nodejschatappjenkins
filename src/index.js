const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

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
    socket.broadcast.emit('clientmessage', 'A new user has joined')

    socket.on('userSubmit', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.emit('clientmessage', message)
        callback()
    })

    socket.on('userLoc', (coords, callback) => {
        io.emit('locationMessage', coords)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('clientmessage', 'A user has disconnected')
    })
})

server.listen(port, () => {
    console.log('Server is up and running on port', port)
})