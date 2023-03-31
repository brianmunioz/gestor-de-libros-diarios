const LibroDiarioBDD = require('../baseDeDatos/libroDiario.baseDeDatos')
let _libroDiarioBB;
class LibroDiarioServicio {
  constructor() {
    _libroDiarioBB = new LibroDiarioBDD;
  }
  async obtenerLibrosDiarios() {
    return _libroDiarioBB.obtenerLibrosDiarios();
  }
  async agregarLibroDiario(data, autorID){
    if(!data){
      const err = new Error('Debe ingresar los datos para que se pueda subir el aciento al libro diario');
      err.status = 400;
      throw err;
    }else if(!data.nombre){
      const err = new Error('Debe ingresar el nombre del libro diario');
      err.status = 400;
      throw err;
    }
    if(!autorID){
      const err = new Error('Usted no está autorizado');
      err.status = 401;
      throw err;
    }
    data.autor = autorID;
    data.fecha_creacion = new Date();
    data.fecha_actualizacion = new Date();

    return _libroDiarioBB.agregarLibroDiario(data);

  }
  async editarLibroDiario(data,libroDiarioID){
    if(!data){
      const err = new Error('Debe ingresar los datos para que se pueda subir el aciento al libro diario');
      err.status = 400;
      throw err;
    }else if(!data.nombre){
      const err = new Error('Debe ingresar el nombre del libro diario');
      err.status = 400;
      throw err;
    }
   
    data.libroDiarioID = libroDiarioID;
    data.fecha_actualizacion = new Date();

    return _libroDiarioBB.editarLibroDiario(data);

  }
  async eliminarLibroDiario( libroDiarioID){
   
    if(!libroDiarioID){
      const err = new Error('Usted no está autorizado');
      err.status = 401;
      throw err;
    }

    return _libroDiarioBB.eliminarLibroDiario(libroDiarioID);

  }
  async obtenerAcientos(libroDiarioID) {
    if (!libroDiarioID) {
      const err = new Error('Debe ingresar un id válido');
      err.status = 400
      throw err
    } else {
      return _libroDiarioBB.obtenerAcientos(libroDiarioID);
    }
  }

  async agregarAciento(data, libroDiarioID){
    if(!data){
      const err = new Error('Debe ingresar los datos para que se pueda subir el aciento al libro diario');
      err.status = 400
      throw err
    }else if(!data.vp){
      const err = new Error('El campo variación patrimonial es obligatorio');
      err.status = 400
      throw err
    }
    else if(!data.cuenta){
      const err = new Error('El campo cuenta es obligatorio');
      err.status = 400
      throw err
    }
    else if(!data.fecha){
      const err = new Error('El campo fecha es obligatorio');
      err.status = 400
      throw err
    }
    else if(!data.librodiario_id){
      const err = new Error('Debe ingresar el id del libro diario');
      err.status = 400
      throw err
    }
    else if(!data.monto){
      const err = new Error('El campo monto es obligatorio');
      err.status = 400
      throw err
    }
    else if(isNaN(data.monto)){
      const err = new Error('El campo monto debe ser un número');
      err.status = 400
      throw err
    }
    else if(!data.tipo){
      const err = new Error('El campo tipo es obligatorio');
      err.status = 400
      throw err
    }
    data.libroDiarioID = libroDiarioID;

    return _libroDiarioBB.agregarAciento(data);

  }

  async editarAciento(data,acientoID){
    if(!data){
      const err = new Error('Debe ingresar los datos para que se pueda subir el aciento al libro diario');
      err.status = 400
      throw err
    }else if(!data.vp){
      const err = new Error('El campo variación patrimonial es obligatorio');
      err.status = 400
      throw err
    }
    else if(!data.cuenta){
      const err = new Error('El campo cuenta es obligatorio');
      err.status = 400
      throw err
    }
    else if(!data.fecha){
      const err = new Error('El campo fecha es obligatorio');
      err.status = 400
      throw err
    }
    else if(!data.librodiario_id){
      const err = new Error('Debe ingresar el id del libro diario');
      err.status = 400
      throw err
    }
    else if(!data.monto){
      const err = new Error('El campo monto es obligatorio');
      err.status = 400
      throw err
    }
    else if(isNaN(data.monto)){
      const err = new Error('El campo monto debe ser un número');
      err.status = 400
      throw err
    }
    else if(!data.tipo){
      const err = new Error('El campo tipo es obligatorio');
      err.status = 400
      throw err
    }

data.acientoID = acientoID;
    return _libroDiarioBB.editarAciento(data);

  }
  async eliminarAciento( acientoID){
   
    if(!acientoID){
      const err = new Error('ID incorrecto');
      err.status = 401;
      throw err;
    }

    return _libroDiarioBB.eliminarAciento(acientoID);

  }
}
module.exports = LibroDiarioServicio