const express = require('express');
const app = express();



const http = require('http');

const server = http.createServer(app);


server.listen(1000);

app.use(express.static('public'));

const socketIo = require('socket.io');
const io = socketIo.listen(server);

io.on('connect',function(socket){
    console.log("nueva conexion id: "+ socket.id);
});