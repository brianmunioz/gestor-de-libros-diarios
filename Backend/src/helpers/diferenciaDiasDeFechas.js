module.exports = (fecha1, fecha2) => {
    // Convertir las fechas a objetos Date
    var date1 = new Date(fecha1);
    var date2 = new Date(fecha2);
  
    // Calcular la diferencia en milisegundos
    var diffMs = Math.abs(date2 - date1);
  
    // Convertir la diferencia a días
    var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
    return diffDays;
  }