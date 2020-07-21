const socket = io()

socket.on('clientmessage', (message) => {
    console.log(message)
})

document.querySelector("#message-form").addEventListener('submit', (e) => {
    e.preventDefault()

    const userMessage = e.target.elements.formmessage.value

    socket.emit('userSubmit', userMessage)
})