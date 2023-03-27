const express = require('express');
const rutaPrincipal = require('./src/rutas/rutas.index');
const app = express().use(rutaPrincipal);
app.listen(3000,()=>{
    console.log('corriendo en  el puerto 3000')
})


