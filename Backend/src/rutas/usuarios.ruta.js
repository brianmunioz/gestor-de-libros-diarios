const {Router} = require('express');
const {UsuariosControlador} = require('../controladores/index');
const {AutenticacionJWT, cacheMiddleWare} = require('../middlewares/index');
const cacheTiempo = require('../helpers/cache-tiempo');
module.exports = function () {
    const router = Router();
    router.get("/verUsuarios",[AutenticacionJWT('getUsuarios'),cacheMiddleWare(cacheTiempo.UNA_HORA)], UsuariosControlador.obtenerUsuarios);
    router.patch("/editarUsuario", [AutenticacionJWT('patchUsuario')], UsuariosControlador.editarUsuario);
    router.delete("/eliminarUsuario",[AutenticacionJWT('deleteUsuario')], UsuariosControlador.eliminarUsuario);
    router.patch("/cambiarPassword",[AutenticacionJWT('patchPass')], UsuariosControlador.cambiarPassword);
    return router;
};