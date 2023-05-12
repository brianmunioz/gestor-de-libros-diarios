const {Router} = require('express');
const {LibroDiarioControlador} = require('../controladores/index');
const {AutenticacionJWT, cacheMiddleWare} = require('../middlewares/index');
const cacheTiempo = require('../helpers/cache-tiempo');

module.exports = function (){
    const router = Router();
    router.get("/verLibrosDiarios",[AutenticacionJWT('getLD'), cacheMiddleWare(cacheTiempo.UNA_HORA)],LibroDiarioControlador.obtenerLibrosDiarios);
    router.post("/agregarLibroDiario", [AutenticacionJWT('postLD')],LibroDiarioControlador.agregarLibroDiario);
    router.get("/verLDUsuarios",[AutenticacionJWT('getMisLD'), cacheMiddleWare(cacheTiempo.UNA_HORA)],LibroDiarioControlador.obtenerLibrosDiariosUsuario);

    router.patch("/editarLibroDiario/:libroDiarioID",[AutenticacionJWT('patchLD')], LibroDiarioControlador.editarLibroDiario);
    router.delete("/eliminarLibroDiario/:libroDiarioID",[AutenticacionJWT('deleteLD')], LibroDiarioControlador.eliminarLibroDiario);
    router.get('/verAcientos/:libroDiarioID',[AutenticacionJWT('getAcientos'),cacheMiddleWare(cacheTiempo.UNA_HORA)],LibroDiarioControlador.obtenerAcientos)
    router.post('/agregarAciento/:libroDiarioID',[AutenticacionJWT('postAciento')],LibroDiarioControlador.agregarAciento)
    router.patch('/editar/:acientoID',[AutenticacionJWT('patchAciento')],LibroDiarioControlador.editarAciento)
    router.delete("/eliminarAciento/:acientoID", [AutenticacionJWT('deleteAciento')],LibroDiarioControlador.eliminarAciento);


    return router;
};