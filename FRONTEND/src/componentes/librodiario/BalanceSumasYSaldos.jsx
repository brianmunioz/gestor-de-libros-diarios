import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { variacionesPatrimoniales } from '../../helpers/variacionesPatrimoniales';

const BalanceSumasYSaldos = ({datos}) => {
  const [acientosAMostrar, setAcientosAMostrar] = useState([]);
  const [totales,setTotales] = useState(false);


  useEffect(()=>{
    const cuentasUsadas = new Set( datos.map(acientos=>{
      if(acientos.cuenta) {
        return acientos.cuenta; 
      }
    }).filter(cuenta=> cuenta !== undefined));
    let sumaTotal = {debe:0,haber:0,deudor:0,acreedor:0};
    const arregloCuentasUsadas = Array.from(cuentasUsadas);
    let acientosFinal = [];
    for(let i = 0; i < arregloCuentasUsadas.length; i++){
      let debe = 0;
      let haber = 0;
      let acreedor = 0;
      let deudor = 0;
      datos.map((aciento)=>{
        if(aciento.monto ){
          if(aciento.cuenta === arregloCuentasUsadas[i]){
          const esDebe = variacionesPatrimoniales.debe.some(vp => vp === aciento.variacion_patrimonial);
          if(esDebe){
            debe += aciento.monto;
          }else{
            haber +=aciento.monto;
          }
        }
        }        
      })
      if(debe > haber){
        deudor = debe-haber;
      }else if(haber > debe){
        acreedor = haber-debe;
      }
      acientosFinal.push({
        cuenta: arregloCuentasUsadas[i],
        debe,
        haber,
        deudor,
        acreedor
      })    
        sumaTotal.debe += debe;
        sumaTotal.haber += haber;
        sumaTotal.deudor += deudor;
        sumaTotal.acreedor += acreedor;
    }
    setTotales(sumaTotal);
    setAcientosAMostrar(acientosFinal)
  },[])
  return (
    <Table  bordered hover  >
    <thead style={{background: '#fdfd96'}}>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <tr>
    <td rowspan="2" className='text-center align-middle' >Cuenta</td>
    <th colspan="2" scope="colgroup" className='text-center'>Sumas</th>
    <th colspan="2" scope="colgroup"className='text-center'>Saldos</th>
  </tr>
  <tr>
    <th scope="col">Debe</th>
    <th scope="col">Haber</th>
    <th scope="col">Deudor</th>
    <th scope="col">Acreedor</th>
  </tr>
    </thead>
    <tbody style={{overflow: 'auto'}}>
 
  {acientosAMostrar.length > 0 && acientosAMostrar.map(aciento =>{
    return <tr>
    <td>{aciento.cuenta}</td>
  <td>{aciento.debe}</td>
  <td>{aciento.haber}</td>
  <td>{aciento.deudor !== 0 || (aciento.acreedor === 0 && aciento.proveedor === 0)? aciento.deudor : '' }</td>
  <td>{aciento.acreedor !== 0 || (aciento.acreedor === 0 && aciento.proveedor === 0)? aciento.acreedor : ''}</td>
  
  </tr>
  })}
 {totales &&<tr style={{background: '#d9d9c0'}} className='fw-bold'>
    <td>{''}</td>
  <td>{totales.debe}</td>
  <td>{totales.haber}</td>
  <td>{totales.deudor }</td>
  <td>{totales.acreedor }</td>
  
  </tr> }
    </tbody>
  </Table>  )
}

export default BalanceSumasYSaldos