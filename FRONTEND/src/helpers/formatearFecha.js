export function formatearFecha(fecha){
    let date = new Date(fecha);
let dia = date.getDate();
let mes = date.getMonth();
let yyy = date.getFullYear();
let fecha_formateada = dia + '/' + mes + '/' + yyy;
return fecha_formateada

}