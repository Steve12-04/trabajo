const express = require('express');
const app = express();



const http = require('http');

const server = http.createServer(app);


server.listen(1000);

app.use(express.static('public'));

const socketIo = require('socket.io');
const io = socketIo.listen(server);
//creando arrays dinamicos de personas conectadas
UserOnId= new Array();
IdsOnUser= new Array();

io.on('connect',function(socket){
    console.log("nueva conexion id: "+ socket.id);

    socket.on('datos_usuario',function(datos){
        usuario = datos.usuario;
        id_socket = socket.id;

            //guardando user por id
            UserOnId[id_socket] = usuario;
            //guardando id por user
            if (IdsOnUser[usuario] == null){
                IdsOnUser[usuario] = new Array();
            }
            IdsOnUser[usuario].push(id_socket);

            console.log("USUARIOS ONLINE");
            console.log("------usuarios por id------");
            console.log(UserOnId);
            console.log("-----------ids por usuarios-------");
            console.log(IdsOnUser); 
            console.log("----------cantidad de usuarios en linea------");
            console.log(Object.keys(IdsOnUser).length);
            

            console.log('correo: ' + datos.correo + ' usuario: ' + datos.usuario+' id_socket: '+ id_socket);
            io.emit('nuevo_usuario', {user:datos.usuario});
        });
    socket.on('send_mensaje',function(datos){
        console.log(datos.usuario + ' esta enviando un mensaje');
        io.emit('nuevo_mensaje', {user:datos.usuario, mensaje: datos.mensaje});
        });
        
        socket.on('disconnect',function(){
            id_user = socket.id;

            if (UserOnId[id_user]) {
                //primero atrapamos su user a partir de su id gracias al objeto UserOnId
                    usuario = UserOnId[id_user];
            //ahora borramos el elemento en UserOnId que ya no necesitaremos
            delete  UserOnId[id_user];
            //ahora atrabapamos todas las ids del usuario en una variable
            array_ids = IdsOnUser[usuario];
            //recorremos sus elementos para obtener ids que necesitamos borrar
            for (var i = 0; i < array_ids.length; i++) {
                if (id_user == array_ids[i]) {
                    id_to_borrar = i;
                    break;
                }
            }
            //borramos id con ayuda de su posicion
            IdsOnUser[usuario].splice(id_to_borrar, 2);

            //ahora si no quedaban mas ids, pues los borramos porque ya no lo utilizaremos
            if (IdsOnUser[usuario].lenght == 0) {
                delete IdsOnUser[usuario];
            }
            console.log("usuario: "+ usuario +" desconectandose");
            console.log("USUARIOS ONLINE");
            console.log("------usuarios por id------");
            console.log(UserOnId);
            console.log("-----------ids por usuarios-------");
            console.log(IdsOnUser); 
            console.log("----------cantidad de usuarios en linea------");
            console.log(Object.keys(IdsOnUser).length);
            }
            

        })


});