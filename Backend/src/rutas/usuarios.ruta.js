const {Router} = require('express');
const {UsuariosControlador} = require('../controladores/index');
const autenticacionJWT = require('../middlewares/autenticacionJWT');
module.exports = function () {
    const router = Router();
    router.get("/verUsuarios",autenticacionJWT, UsuariosControlador.obtenerUsuarios);
    router.patch("/editarUsuario", autenticacionJWT, UsuariosControlador.editarUsuario);
    router.delete("/eliminarUsuario",autenticacionJWT, UsuariosControlador.eliminarUsuario);
    router.patch("/cambiarPassword",autenticacionJWT, UsuariosControlador.cambiarPassword);
    return router;
};