const {Router} = require('express');
const {AutorizacionControlador} = require('../controladores/index');
const { AutenticacionJWT } = require('../middlewares');
module.exports = function () {
    const router = Router();
    router.post("/iniciarSesion", AutorizacionControlador.iniciarSesion);
    router.post("/registro", AutorizacionControlador.registrar);
    router.get("/obtenerautorizacion",AutenticacionJWT('ObtenerAuth'), AutorizacionControlador.obtenerAutorizacion);
    router.post("/agregarautorizacion",AutenticacionJWT('addAuth'), AutorizacionControlador.agregarAutorizacion);
    router.delete("/eliminarautorizacion",AutenticacionJWT('deleteAuth'), AutorizacionControlador.eliminarAutorizacion);
    router.get("/obtenerusuariosautorizados/:libroDiarioID",AutenticacionJWT('ObtenerAuth'), AutorizacionControlador.obtenerUsuariosAutorizados);



 


    return router;
};