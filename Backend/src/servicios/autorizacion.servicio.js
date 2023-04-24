const { validarPassword, encriptarPassword, generarToken } = require('../helpers');

const UsuarioServicio = require('../servicios/usuarios.servicio');
let _usuarioServicio = null;

class AutorizacionServicio {
    constructor() {
        _usuarioServicio = new UsuarioServicio;
    }
    async registrar(usuario) {       
        const regPatternEmail = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        const verificarPass = validarPassword(usuario.pass);
        if(!usuario){
            const error = new Error('Es obligatorio enviar datos')
            error.status = 400;
            throw error
        }else if(!usuario.nombre || !isNaN(usuario.nombre)){
            const error = new Error('Debe ingresar un nombre válido')
            error.status = 400;
            throw error
        }else if(!usuario.apellido || !isNaN(usuario.apellido)){
            const error = new Error('Debe ingresar un apellido válido')
            error.status = 400;
            throw error
        }else if (usuario.fecha_nacimiento.match(regPatternEmail) === false  && (!usuario.email)) {
            const error = new Error('Debe ingresar un email válido')
            error.status = 400;
            throw error     
        }else if(verificarPass.esValido === false  ){
          const error = new Error(verificarPass.error)
            error.status = 401;
            throw error
        }
        const existeUsuario = await _usuarioServicio.buscarUsuarioPorEmail(usuario.email,true); 
        if (existeUsuario.existe) {
            const error = new Error('El email usado ya está en uso');
            error.status = 400;
            throw error;
        }
        usuario.rol = 'usuario';
        usuario.fecha_creacion = new Date();
        usuario.fecha_actualizacion = new Date();
        usuario.registrado_desde = new Date();
        usuario.pass = encriptarPassword(usuario.pass);
        return await _usuarioServicio.agregarUsuario(usuario);
    }
    async iniciarSesion(usuario) {
        const { email, pass, recordar } = usuario;
        const horas = recordar === true ? '5d':'5h';
        const existeUsuario = await _usuarioServicio.buscarUsuarioPorEmail(email,false); 
        if (!existeUsuario.existe) {
            const error = new Error('Usuario o contraseña incorrecto');
            error.status = 404;
            throw error;
        }
        const validarPass = await _usuarioServicio.compararContraseñas(pass, existeUsuario.pass);
        if (!validarPass) {
            const error = new Error('Usuario o contraseña incorrecto');
            error.status = 400;
            throw error;
        }
        const usuarioAEncriptar = {
            username: email.email,
            nombre: existeUsuario.nombre,
            apellido: existeUsuario.apellido,
            id: existeUsuario.id,
            rol: existeUsuario.rol
        };
        const token = generarToken(usuarioAEncriptar,horas);
        
        return { token, usuario: usuarioAEncriptar };
    }


}
module.exports = AutorizacionServicio;