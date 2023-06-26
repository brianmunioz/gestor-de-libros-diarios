const {Router} = require('express');
const {UsuariosControlador} = require('../controladores/index');
const {AutenticacionJWT, cacheMiddleWare} = require('../middlewares/index');
const cacheTiempo = require('../helpers/cache-tiempo');
module.exports = function () {
    const router = Router();
    router.get("/verUsuarios",[AutenticacionJWT('getUsuarios'),cacheMiddleWare(cacheTiempo.UNA_HORA)], UsuariosControlador.obtenerUsuarios);
    router.get("/obtenerUsuario/:idUsuario",[cacheMiddleWare(cacheTiempo.UNA_HORA)], UsuariosControlador.obtenerUsuario);

    router.patch("/editarUsuario", [AutenticacionJWT('patchUsuario')], UsuariosControlador.editarUsuario);
    router.delete("/eliminarUsuario",[AutenticacionJWT('deleteUsuario')], UsuariosControlador.eliminarUsuario);
    router.patch("/cambiarpass",[AutenticacionJWT('patchPass')], UsuariosControlador.cambiarPassword);
    return router;
};