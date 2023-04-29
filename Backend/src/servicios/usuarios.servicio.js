const { compareSync } = require('bcrypt');
const UsuariosBDD = require('../baseDeDatos/usuarios.baseDeDatos');
const { validarPassword } = require('../helpers');
let _usuariosBDD;
class UsuariosServicio {
  constructor() {
    _usuariosBDD = new UsuariosBDD;
  }
    async obtenerUsuarios() {
      return _usuariosBDD.obtenerUsuarios();
    } 
    async buscarUsuarioPorEmail(email, registro){
      return _usuariosBDD.buscarUsuarioPorEmail(email,registro)
    }
    async compararContraseñas(pass,hash){
      return  compareSync(pass, hash);
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
        if(data.id !== req.user){
          const error = new Error('No estás autorizado para cambiar la contraseña de este usuario')
          error.status = 401;
          throw error          
        }
      return  _usuariosBDD.cambiarPassword(data);
  
    }
    async agregarUsuario(data) {      
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
        if(data.id !== req.user){
          const error = new Error('No estás autorizado para editar este usuario')
          error.status = 401;
          throw error          
        }
        return _usuariosBDD.editarUsuario(data);
    }
    async eliminarUsuario(usuarioID) {  
      if(!usuarioID){
        const error = new Error('Debe ingresar un id para eliminar usuario');
        error.status = 400;
        throw error;
      }
      if(usuarioID !== req.user){
        const error = new Error('No estás autorizado para eliminar a este usuario')
        error.status = 401;
        throw error          
      }
      return _usuariosBDD.eliminarUsuario(usuarioID);
    }    
  }
  module.exports = UsuariosServicio