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

    socket.on('datos_usuario',function(datos){
            id_user=socket.id;
            console.log('correo: ' + datos.correo + ' usuario: ' + datos.usuario+'id_socket: '+ id_user);
            io.emit('nuevo_usuario', {user:datos.usuario});
        });
    socket.on('send_mensaje',function(datos){
        console.log(datos.usuario + ' esta enviando un mensaje');
        io.to(id_usuario).emit('nuevo_mensaje', {user:datos.usuario, mensaje: datos.mensaje});
        });
})