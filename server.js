const express = require('express')
const app = express();
const http = require('http').createServer(app); //server creation : http is the server

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
//using middleware to access static files
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); //now this sending this file to server
})


//socket
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected to the server')

    //server will get or listen the message here
    socket.on('message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('message',msg) //sends msg to everyone except the client
    })
})