const {Router} = require('express');
const {UsuariosControlador} = require('../controladores/index')
module.exports = function () {
    const router = Router();
    router.get("/verUsuarios", UsuariosControlador.obtenerUsuarios);
    router.post("/agregarUsuarios", UsuariosControlador.agregarUsuario);
    router.patch("/editarUsuario", UsuariosControlador.editarUsuario);
    router.delete("/eliminarUsuario", UsuariosControlador.eliminarUsuario);
    router.patch("/cambiarPassword", UsuariosControlador.cambiarPassword);
    return router;
};