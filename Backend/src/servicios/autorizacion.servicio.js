const e = require("express");
const AutorizacionesBaseDeDatos = require("../baseDeDatos/autorizaciones.baseDeDatos");
const LibroDiarioBDD = require("../baseDeDatos/libroDiario.baseDeDatos");
const {
  validarPassword,
  encriptarPassword,
  generarToken,
} = require("../helpers");

const UsuarioServicio = require("../servicios/usuarios.servicio");
let _usuarioServicio = null;
let _autorizacionesBDD = null;
let _libroDiarioBDD = null;

class AutorizacionServicio {
  constructor() {
    _usuarioServicio = new UsuarioServicio();
    _autorizacionesBDD = new AutorizacionesBaseDeDatos();
    _libroDiarioBDD = new LibroDiarioBDD();
  }

  async obtenerAutorizacion(datos, usuario) {
    if (!datos.id) {
      const error = new Error("Debe ingresar un usuario válido");
      error.status = 400;
      throw error;
    } else if (!datos.libro_diario) {
      const error = new Error("Debe ingresar un libro diario válido");
      error.status = 400;
      throw error;
    }

    const usuarioDelLibroDiarioIngresado =
      await _libroDiarioBDD.obtenerUsuarioIDdeLibroDiario(datos.libro_diario);

    if (usuario !== usuarioDelLibroDiarioIngresado) {
      const error = new Error(
        "No estàs autorizado para acciones de autorizaciones en este libro diario"
      );
      error.status = 401;
      throw error;
    }

    return _autorizacionesBDD.obtenerAutorizacion(datos.id, datos.libro_diario);
  }

  async obtenerUsuariosAutorizados(libro_diario, usuario) {
    if (!libro_diario) {
      const error = new Error("Debe enviar libro diario");
      error.status = 400;
      throw error;
    }
    const autorLD = await _libroDiarioBDD.obtenerUsuarioIDdeLibroDiario(
      libro_diario
    );
    if (autorLD !== usuario) {
      const error = new Error(
        "Usted no está autorizado para acceder a estos datos"
      );
      error.status = 401;
      throw error;
    }
    return _autorizacionesBDD.obtenerUsuariosAutorizados(libro_diario);
  }
  async agregarAutorizacion(datos, usuario) {
    if (!datos.autor) {
      const error = new Error("Debe ingresar un usuario válido");
      error.status = 400;
      throw error;
    } else if (!datos.libro_diario) {
      const error = new Error("Debe ingresar un libro diario válido");
      error.status = 400;
      throw error;
    }

    const usuarioDelLibroDiarioIngresado =
      await _libroDiarioBDD.obtenerUsuarioIDdeLibroDiario(datos.libro_diario);

    if (usuario !== usuarioDelLibroDiarioIngresado) {
      const error = new Error(
        "No estàs autorizado para acciones de autorizaciones en este libro diario"
      );
      error.status = 401;
      throw error;
    }
    const existeAutorizacion = await this.obtenerAutorizacion(
      { id: datos.autor, libro_diario: datos.libro_diario },
      usuario
    );
    if (existeAutorizacion.length > 0) {
      const error = new Error("Este usuario ya existe");
      error.status = 401;
      throw error;
    }
    datos.fecha = new Date();
    return _autorizacionesBDD.agregarAutorizacion(datos);
  }
  async eliminarAutorizacion(datos, usuario) {
    if (!datos.id) {
      const error = new Error("Debe ingresar un usuario válido");
      error.status = 400;
      throw error;
    } else if (!datos.libro_diario) {
      const error = new Error("Debe ingresar un libro diario válido");
      error.status = 400;
      throw error;
    }

    const usuarioDelLibroDiarioIngresado =
      await _libroDiarioBDD.obtenerUsuarioIDdeLibroDiario(datos.libro_diario);

    if (usuario !== usuarioDelLibroDiarioIngresado) {
      const error = new Error(
        "No estàs autorizado para acciones de autorizaciones en este libro diario"
      );
      error.status = 401;
      throw error;
    }
    const existeAutorizacion = await this.obtenerAutorizacion(datos, usuario);
    if (existeAutorizacion.length === 0) {
      const error = new Error("Este usuario no existe");
      error.status = 401;
      throw error;
    }
    return _autorizacionesBDD.eliminarAutorizacion(
      datos.id,
      datos.libro_diario
    );
  }
  async registrar(usuario) {
    const regPatternEmail = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    const verificarPass = validarPassword(usuario.pass);
    if (!usuario.nombre || !isNaN(usuario.nombre)) {
      const error = new Error("Debe ingresar un nombre válido");
      error.status = 400;
      throw error;
    } else if (!usuario.apellido || !isNaN(usuario.apellido)) {
      const error = new Error("Debe ingresar un apellido válido");
      error.status = 400;
      throw error;
    } else if (
      usuario.email.match(regPatternEmail) === false &&
      !usuario.email
    ) {
      const error = new Error("Debe ingresar un email válido");
      error.status = 400;
      throw error;
    } else if (!usuario.fecha_nacimiento) {
      const error = new Error("Debe ingresar una fecha de nacimiento válida");
      error.status = 400;
      throw error;
    } else if (verificarPass.esValido === false) {
      const error = new Error(verificarPass.error);
      error.status = 401;
      throw error;
    }
    const existeUsuario = await _usuarioServicio.buscarUsuarioPorEmail(
      usuario.email,
      true
    );
    if (existeUsuario.existe) {
      const error = new Error("El email ingresado ya está en uso");
      error.status = 400;
      throw error;
    }
    usuario.rol = "usuario";
    usuario.fecha_creacion = new Date();
    usuario.fecha_actualizacion = new Date();
    usuario.registrado_desde = new Date();

    usuario.pass = encriptarPassword(usuario.pass);
    return await _usuarioServicio.agregarUsuario(usuario);
  }
  async iniciarSesion(usuario) {
    const { email, pass, recordar } = usuario;
    const horas = recordar === true ? "5d" : "5h";
    const existeUsuario = await _usuarioServicio.buscarUsuarioPorEmail(
      email,
      false
    );
    if (!existeUsuario.existe) {
      const error = new Error("Usuario o contraseña incorrecto");
      error.status = 404;
      throw error;
    }
    const validarPass = await _usuarioServicio.compararContraseñas(
      pass,
      existeUsuario.pass
    );
    if (!validarPass) {
      const error = new Error("Usuario o contraseña incorrecto");
      error.status = 400;
      throw error;
    }
    const usuarioAEncriptar = {
      username: email.email,
      nombre: existeUsuario.nombre,
      apellido: existeUsuario.apellido,
      id: existeUsuario.id,
      rol: existeUsuario.rol,
    };
    const token = generarToken(usuarioAEncriptar, horas);

    return { token, usuario: usuarioAEncriptar };
  }
}
module.exports = AutorizacionServicio;
