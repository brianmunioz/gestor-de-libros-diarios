import React, {  useEffect, useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import Aciento from './Aciento';
import axios from 'axios';
import config from '../../config/config';
import validacionCuentas from '../../helpers/validacionCuentas';
import { todasLasCuentas } from '../../helpers/todasLasCuentas';
import { variacionesPatrimoniales } from '../../helpers/variacionesPatrimoniales';
import { formatearFecha } from '../../helpers/formatearFecha';

const LDTabla = ({ datos, id }) => {
  
  const [fecha, setFecha] = useState('');
  const [cuenta, setCuenta] = useState('mercaderías');
  const [VP, setVP] = useState('');
  const [error, setError] = useState('');

  const [debe, setDebe] = useState('');
  const [haber, setHaber] = useState('');
  const [tipo, setTipo] = useState('');
  const [nuevosArreglos, setNuevosArreglos] = useState([]);
  const [nuevaOperacion,setNuevaOperacion] = useState('');
  const token = document.cookie.replace('token=', '');
  useEffect(()=>{
    if(localStorage.getItem('Acientos')) setNuevosArreglos(JSON.parse(localStorage.getItem('Acientos')).filter(aciento =>{return  aciento.libro_diario === id}))
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
    const operacion_ = 2;
    const monto = haber ? haber : debe;
    const nuevoAciento = {
      fecha: new Date(),
      cuenta,      
      monto,
      variacion_patrimonial: VP,
      operacion: operacion_ ,
      tipo,
      libro_diario: id
    }
    let arregloDeAcientos = [];
    if(localStorage.getItem('Acientos')) arregloDeAcientos.push(...JSON.parse(localStorage.getItem('Acientos')))
    arregloDeAcientos.push(nuevoAciento);
    const acientosDelLibroDiarioActual = arregloDeAcientos.filter(aciento =>{return  aciento.libro_diario === id});
    setNuevosArreglos(acientosDelLibroDiarioActual)
    localStorage.setItem('Acientos',JSON.stringify(arregloDeAcientos));
    console.log(arregloDeAcientos.filter(aciento =>{return  aciento.libro_diario === id}))
   
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
    <Table striped bordered hover>
      <thead>
        <tr>
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
        {nuevosArreglos.length >0 && nuevosArreglos.map(aciento=>{return <Aciento aciento={aciento} color={'#ff7e00'}/> })}
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
          <td>{localStorage.getItem('user')}</td>
          <td><Button onClick={agregarAciento}>Add</Button></td>
        </tr>
        {error && <tr colspan="8"><td colspan="8" className='text-center bg-danger text-light p-2' >{error}</td></tr> }
      </tbody>

    </Table>
  )
}

export default LDTabla