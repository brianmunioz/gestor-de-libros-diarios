import React, { useEffect, useState } from 'react'
import { formatearFecha } from '../../helpers/formatearFecha';
import { variacionesPatrimoniales } from '../../helpers/variacionesPatrimoniales';
const Aciento = ({ aciento, color, colorOperacion = '#c3c370' }) => {
  const [debe, setDebe] = useState(false);
  const [fin,setFin] = useState(false);
  console.log(aciento.descripcion_operacion)
  useEffect(() => {
    if(aciento.descripcion_operacion) setFin(true)
    const esDebe =variacionesPatrimoniales.debe.some((vp)=>aciento.variacion_patrimonial === vp)

    if (esDebe) {
      setDebe(true);
    }
  }, []);
const colorCeldas = color ? color: 'white';
if(fin){
  return (
    <tr colspan="8" style={{background: colorOperacion}}><td colspan="8" className='text-center'>{aciento.descripcion_operacion}</td></tr>
    )
}else{
  return (
    <tr style={{backgroundColor: colorCeldas}}>
      <td >{formatearFecha(aciento.fecha)}</td>
      <td >{aciento.cuenta}</td>
      <td >{aciento.variacion_patrimonial}</td>
   
            <td >{debe?new Intl.NumberFormat().format(aciento.monto):''}</td>
            <td >{!debe?new Intl.NumberFormat().format(aciento.monto):''}</td>
      <td >{aciento.tipo}</td>
      <td >{aciento.autor}</td>
      <td >{aciento.operacion}</td>

    </tr>)

}


}

export default Aciento