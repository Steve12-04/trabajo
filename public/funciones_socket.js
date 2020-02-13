const socket = io.connect();
        socket.on('nuevo_usuario',function(datos){
            alert("nuevo usuario conectado: "+datos.user);
        });

        socket.on('nuevo_mensaje',function(datos){
            $('#nuevo_mensaje').append('<p ><strong>'+datos.user+': </strong>esto es un mensaje </p>')
        });

function loguear(){
    correo = $('#login_form #correo').val();
    usuario = $('#login_form #usuario').val();
    socket.emit('datos_usuario', {correo: correo, usuario:usuario});
    
}
function enviar_msj{
    mensaje = $('#mensaje').val();
    alert(mensaje);
    socket.emit('send_mensaje', {mensaje: mensaje, usuario: usuario});
}