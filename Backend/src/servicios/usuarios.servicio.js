const UsuariosBDD = require('../baseDeDatos/usuarios.baseDeDatos');
const { validarPassword, encriptarPassword } = require('../helpers');
let _usuariosBDD;
class UsuariosServicio {
  constructor() {
    _usuariosBDD = new UsuariosBDD;
  }
    async obtenerUsuarios() {
      return _usuariosBDD.obtenerUsuarios();
    } 

    async cambiarPassword(data){
      const verificarPass = validarPassword(data.pass);
        if(!data){
            const error = new Error('Debe enviar datos')
            error.status = 400;
            throw error
        }
       else if(!data.pass){
            const error = new Error('Es obligatorio enviar contraseña')
            error.status = 400;
            throw error
        }else if(!data.id){
            const error = new Error('No se a encontrado id del usuario')
            error.status = 401;
            throw error
        }else if(verificarPass.esValido === false  ){
          const error = new Error(verificarPass.error)
            error.status = 401;
            throw error
        }
      return  _usuariosBDD.cambiarPassword(data);
  
    }
    async agregarUsuario(data) {
        const regPatternEmail = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        const verificarPass = validarPassword(data.pass);
        if(!data){
            const error = new Error('Es obligatorio enviar datos')
            error.status = 400;
            throw error
        }else if(!data.nombre || !isNaN(data.nombre)){
            const error = new Error('Debe ingresar un nombre válido')
            error.status = 400;
            throw error
        }else if(!data.apellido || !isNaN(data.apellido)){
            const error = new Error('Debe ingresar un apellido válido')
            error.status = 400;
            throw error
        }else if (data.fecha_nacimiento.match(regPatternEmail) === false  && (!data.email)) {
            const error = new Error('Debe ingresar un email válido')
            error.status = 400;
            throw error     
        }else if(verificarPass.esValido === false  ){
          const error = new Error(verificarPass.error)
            error.status = 401;
            throw error
        }
        data.rol = 'usuario';
        data.fecha_creacion = new Date();
        data.fecha_actualizacion = new Date();
        data.pass = encriptarPassword(data.pass);
        return _usuariosBDD.agregarUsuario(data);      
    }
    async editarUsuario(data) {
        if(!data){
            const error = new Error('Es obligatorio enviar datos')
            error.status = 400;
            throw error
        }else if(!data.nombre || !isNaN(data.nombre)){
            const error = new Error('Debe ingresar un nombre válido')
            error.status = 400;
            throw error
        }else if(!data.apellido || !isNaN(data.apellido)){
            const error = new Error('Debe ingresar un apellido válido')
            error.status = 400;
            throw error
        }else if (data.email.match(regPatternEmail) === false  && (!data.email)) {
            const error = new Error('Debe ingresar un email válido')
            error.status = 400;
            throw error     
        }
    }
    async eliminarUsuario(usuarioID) {  
      if(!usuarioID){
        const error = new Error('Debe ingresar un id para eliminar usuario');
        error.status = 400;
        throw error;
      }
      return _usuariosBDD.eliminarUsuario(usuarioID);
    }    
  }
  module.exports = UsuariosServicio