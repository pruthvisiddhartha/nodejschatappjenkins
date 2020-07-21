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

io.on('connection', () => {
    console.log('New Connection Setup')
})

server.listen(port, () => {
    console.log('Server is up and running on port', port)
})