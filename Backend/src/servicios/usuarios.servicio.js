const { compareSync } = require('bcrypt');
const UsuariosBDD = require('../baseDeDatos/usuarios.baseDeDatos');
const { validarPassword, encriptarPassword } = require('../helpers');
const diferenciaDiasDeFechas = require('../helpers/diferenciaDiasDeFechas');

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
    async obtenerPass(id){
      return _usuariosBDD.obtenerPass(id);
    }
    async obtenerUsuario(usuarioID){
      return _usuariosBDD.obtenerUsuario(usuarioID)
    }
    async cambiarPassword(data,usuarioID){
      const verificarPassNueva = validarPassword(data.passNueva);
      const passDelUsuario = await this.obtenerPass(usuarioID);
      const esValidaPassActual = await this.compararContraseñas(data.passActual,passDelUsuario[0].pass)
        if(!esValidaPassActual){
            const error = new Error(JSON.stringify({mensaje: 'La contraseña actual es incorrecta!', passNueva: false}))
            error.status = 400;
            throw error
        }
        else  if(!data.passNueva){
          const error = new Error(JSON.stringify({mensaje: 'Es obligatorio enviar contraseña nueva', passNueva: true}))
          error.status = 400;
          throw error
      }else if(verificarPassNueva.esValido === false){
          const error = new Error(JSON.stringify({mensaje: verificarPassNueva.error, passNueva: true}))
            error.status = 400;
            throw error
        }
        const usuario = await _usuariosBDD.obtenerUsuario(usuarioID);
        const diasTotalesDeDiferencia  = diferenciaDiasDeFechas(usuario[0].fecha_actualizacion.toString(), Date().toString()); 
        if(diasTotalesDeDiferencia <= 7){
          const diasQueLeFaltaParaActualizar = 7-parseInt(diasTotalesDeDiferencia);
          const error = new Error(JSON.stringify({mensaje: "No puedes cambiar tus datos hasta después de "+diasQueLeFaltaParaActualizar+" dias.", noPuedeModificar: true}));
          error.status = 400;
          throw error;
        }
        data.pass = encriptarPassword(data.passNueva) ;
        data.id = usuarioID;
      return  _usuariosBDD.cambiarPassword(data);
  
    }
    async agregarUsuario(data) {      
        return _usuariosBDD.agregarUsuario(data);      
    }
    async editarUsuario(data,usuarioID) {
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
        }else if (!data.email) {
            const error = new Error('Debe ingresar un email válido')
            error.status = 400;
            throw error     
        }
        const usuario = await _usuariosBDD.obtenerUsuario(usuarioID);
        const diasTotalesDeDiferencia  = diferenciaDiasDeFechas(usuario[0].fecha_actualizacion.toString(), Date().toString()); 
        if(diasTotalesDeDiferencia <= 30){
          const diasQueLeFaltaParaActualizar = 30-parseInt(diasTotalesDeDiferencia);
          const error = new Error("No puedes cambiar tus datos hasta después de "+diasQueLeFaltaParaActualizar+" dias.");
          error.status = 400;
          throw error;
        }
       data.usuarioID = usuarioID;
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