const socket = io()

const $messageForm = document.querySelector("#message-form")
const $messageFormInput = document.querySelector("input")
const $messageFormButton = document.querySelector("button")
const $locationButton = document.querySelector("#send-location")

const $messages = document.querySelector('#show-all-messages')
const $locations = document.querySelector('#locations')

// Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('clientmessage', (message) => {
    console.log(message)
    const html = Mustache.render($messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (url) => {
    console.log(url)
    const lochtml = Mustache.render($locationTemplate, {
        url
    })
    $locations.insertAdjacentHTML('beforeend', lochtml)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled','disabled')

    const userMessage = e.target.elements.formmessage.value

    socket.emit('userSubmit', userMessage, (error) => {

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if(error){
            return console.log(error)
        }
        console.log('Message Delivered')

    })
})

$locationButton.addEventListener('click', () => {    

    if (!navigator.geolocation){
        return alert("Your current browser doesn't support sharing location")
    }

    $locationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const loc = 'https://www.google.com/maps?q='+ position.coords.latitude + ',' + position.coords.longitude
        socket.emit('userLoc', loc, () => {
            $locationButton.removeAttribute('disabled')
            console.log('Location Delivered!!')
        })        
    })        
})

