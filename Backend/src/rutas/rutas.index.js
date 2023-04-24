const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const errorMiddleware = require('../middlewares/error.middleware');
const { librodiarioRuta, autorizacionRuta, usuariosRuta } = require('.');
const rutaPrincipal = express.Router();
const rutas = express.Router();
require('express-async-errors');


rutaPrincipal
.use(express.json())
.use(cors())
.use(helmet())
.use(compression())

rutaPrincipal.use('/v1/api', rutas);

rutas.use('/librodiario', librodiarioRuta());
rutas.use('/usuarios', usuariosRuta()); 
rutas.use('/autorizacion', autorizacionRuta()); 




rutaPrincipal.use(errorMiddleware);
module.exports = rutaPrincipal;