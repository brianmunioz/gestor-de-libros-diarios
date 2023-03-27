const {Router} = require('express');
const LibroDiarioControlador = require('../controladores/libroDiario.controlador')
module.exports = function () {
    const router = Router();
    const controlador = new  LibroDiarioControlador;
    router.get("/verLibrosDiarios", controlador.obtenerLibrosDiarios);
    router.get('/verAcientos',controlador.obtenerAcientos)
    return router;
};