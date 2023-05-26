import React, { useEffect, useState } from 'react'
import { formatearFecha } from '../../helpers/formatearFecha';

const Aciento = ({ aciento, color }) => {
  const [debe, setDebe] = useState(false);
  const [fin,setFin] = useState(false);
  
  useEffect(() => {
    if(aciento.descripcion_operacion) setFin(true)
    if (aciento.variacion_patrimonial === 'PN' ||
      aciento.variacion_patrimonial === 'A+') {
      setDebe(true);
    }
  }, []);
const colorCeldas = color ? color: 'white';
if(fin){
  return (
    <tr colspan="8"><td colspan="8" className='text-center'>{aciento.descripcion_operacion}</td></tr>
    )
}else{
  return (
    <tr style={{backgroundColor: colorCeldas}}>
      <td >{formatearFecha(aciento.fecha)}</td>
      <td >{aciento.cuenta}</td>
      <td >{aciento.variacion_patrimonial}</td>
      {
        debe === true ?
          <>
            <td >{aciento.monto}</td>
            <td ></td>
          </> : <>
            <td ></td>
            <td >{aciento.monto}</td>
          </>
      }
      <td >{aciento.tipo}</td>
      <td >{aciento.autor}</td>
      <td >{aciento.operacion}</td>

    </tr>)

}


}

export default Aciento