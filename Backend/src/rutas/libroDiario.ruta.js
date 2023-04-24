const {Router} = require('express');
const {LibroDiarioControlador} = require('../controladores/index');
const {AutenticacionJWT} = require('../middlewares/index');

module.exports = function (){
    const router = Router();
    router.get("/verLibrosDiarios",AutenticacionJWT,LibroDiarioControlador.obtenerLibrosDiarios);
    router.post("/agregarLibroDiario", LibroDiarioControlador.agregarLibroDiario);
    router.patch("/editarLibroDiario/:libroDiarioID", LibroDiarioControlador.editarLibroDiario);
    router.delete("/eliminarLibroDiario/:libroDiarioID", LibroDiarioControlador.eliminarLibroDiario);
    router.get('/verAcientos/:libroDiarioID',LibroDiarioControlador.obtenerAcientos)
    router.post('/agregarAciento/:libroDiarioID',LibroDiarioControlador.agregarAciento)
    router.patch('/editar/:acientoID',LibroDiarioControlador.editarAciento)
    router.delete("/eliminarAciento/:acientoID", LibroDiarioControlador.eliminarAciento);


    return router;
};