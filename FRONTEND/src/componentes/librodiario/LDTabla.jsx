import React, {  useEffect, useState } from 'react';
import {  Button, Table } from 'react-bootstrap';
import Aciento from './Aciento';
import validacionCuentas from '../../helpers/validacionCuentas';
import { todasLasCuentas } from '../../helpers/todasLasCuentas';
import { formatearFecha } from '../../helpers/formatearFecha';

const LDTabla = ({ datos, id, editar }) => {
  const [cuenta, setCuenta] = useState('mercaderías');
  const [VP, setVP] = useState('');
  const [error, setError] = useState('');
  const [debe, setDebe] = useState('');
  const [haber, setHaber] = useState('');
  const [tipo, setTipo] = useState('');
  const [nuevosArreglos, setNuevosArreglos] = useState([]);
  useEffect(()=>{
    if(sessionStorage.getItem('acientos_'+id)) setNuevosArreglos(JSON.parse(sessionStorage.getItem('acientos_'+id)))
  },[])
  const agregarAciento = () => {
    if((!haber && !debe) || (haber <=0 && debe <= 0)){
      setError('El monto es obligatorio');
      return
    }else if(!tipo){
      setError('Debe ingresar descripción del aciento');
      return
    }
    else if(cuenta.trim() === ''){
      setError('Debe seleccionar una cuenta');
      return
    }
    setError('');
    const monto = haber ? haber : debe;
    const nuevoAciento = {
      fecha: new Date(),
      cuenta,      
      monto,
      variacion_patrimonial: VP,
      tipo
    }
    let arregloDeAcientos = [];
    if(sessionStorage.getItem('acientos_'+id)) arregloDeAcientos.push(...JSON.parse(sessionStorage.getItem('acientos_'+id)))
    arregloDeAcientos.push(nuevoAciento);
    setNuevosArreglos(arregloDeAcientos)
    sessionStorage.setItem('acientos_'+id,JSON.stringify(arregloDeAcientos));   
  }
  const verificarCuenta = (cuenta) => {
    const verificarCuenta = validacionCuentas(cuenta);
    if (!verificarCuenta.error) {
      if (debe) {
        setVP(verificarCuenta.debe)
      }
      if (haber) {
        setVP(verificarCuenta.haber)
      }
    }

  }
  if(error){
    setTimeout(()=>{
setError('');
    },5000)
  }

  return (
    <Table  bordered hover>
      <thead>
        <tr style={{background: '#fdfd96'}}>
          <th>Fecha</th>
          <th>Cuenta</th>
          <th>VP</th>
          <th>DEBE</th>
          <th>HABER</th>
          <th>detalle</th>
          <th>autor</th>
          <th>Operación</th>
        </tr>
      </thead>
      <tbody >

        {datos.length > 0 && datos.map(aciento => <Aciento aciento={aciento}  />)}
        {nuevosArreglos.length >0 && sessionStorage.getItem('acientos_'+id) && nuevosArreglos.map(aciento=>{return <Aciento aciento={aciento} color={'#ff7e00'}/> })}
        {editar && 
        <tr>
        <td>{formatearFecha(new Date())}</td>
        <td > <select name="select"  data-show-subtext="true" data-live-search="true" onChange={(e) => {
          setCuenta(e.target.value);
          verificarCuenta(e.target.value);
        }} >
          {
            todasLasCuentas.map(cuenta => <option value={cuenta} key={cuenta} >{cuenta}</option>
            )
          }

        </select> </td>
        <td> {VP} </td>

        {!haber ? <td><input type="number" value={debe} onChange={(e) => {
          setHaber('');
          setDebe(e.target.value);
          verificarCuenta(cuenta)
        }} /></td> :
          <td><input type="number" disabled /></td>}
        {!debe ? <td><input type="number" value={haber} onChange={async (e) => {
          setDebe('');
          setHaber(e.target.value);
          verificarCuenta(cuenta);
        }} /></td> :
          <td><input type="number" disabled /></td>
        }

        <td><input type="text" value={tipo} onChange={(e) => { setTipo(e.target.value) }} /></td>
        <td>{sessionStorage.getItem('user')}</td>
        <td><Button variant='outline-dark'onClick={agregarAciento}>Add</Button></td>
      </tr>}
        {error && <tr colspan="8"><td colspan="8" className='text-center bg-danger text-light p-2' >{error}</td></tr> }
      </tbody>

    </Table>
  )
}

export default LDTabla