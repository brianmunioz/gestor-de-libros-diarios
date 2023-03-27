const conexionBDD = require("./crearConexion.baseDeDatos");
let _conn;
class LibroDiario {
   constructor() {
      _conn = conexionBDD()
   }
   async obtenerLibrosDiarios() {
   return new Promise((resolve, reject) => {
   _conn.query('SELECT * FROM libros_diarios', (error, results, fields) => {
     if(error) return reject(error);     
     return resolve(results); 
   });
 });       
   }
   async obtenerAcientos(librodiario_id){
         return new Promise((resolve, reject) => {
            _conn.query(`SELECT * FROM acientos WHERE id= ${librodiario_id}`, (error, results, fields) => {
              if(error) return reject(error);              
              return resolve(results); 
            });
          });
      
   }
   async agregarLibroDiario(){
      return 
   }
   async agregarAciento(){
      return
   }
}
module.exports = LibroDiario