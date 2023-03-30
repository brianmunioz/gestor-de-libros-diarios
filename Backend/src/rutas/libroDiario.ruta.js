const {Router} = require('express');
const LibroDiarioControlador = require('../controladores/libroDiario.controlador')
module.exports = function () {
    const router = Router();
    const controlador = new  LibroDiarioControlador;
    router.get("/verLibrosDiarios", controlador.obtenerLibrosDiarios);
    router.post("/agregarLibroDiario", controlador.agregarLibroDiario);
    router.patch("/editarLibroDiario/:libroDiarioID", controlador.editarLibroDiario);
    router.delete("/eliminarLibroDiario/:libroDiarioID", controlador.eliminarLibroDiario);

    router.get('/verAcientos',controlador.obtenerAcientos)
    router.post('/agregarAciento/:libroDiarioID',controlador.agregarAciento)
    router.patch('/editar/:acientoID',controlador.editarAciento)
    router.delete("/eliminarAciento/:acientoID", controlador.eliminarAciento);


    return router;
};