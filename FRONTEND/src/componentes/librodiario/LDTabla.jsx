import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Aciento from './Aciento';
import axios from 'axios';
import config from '../../config/config';
import validacionCuentas from '../../helpers/validacionCuentas';
import { todasLasCuentas } from '../../helpers/todasLasCuentas';
import { variacionesPatrimoniales } from '../../helpers/variacionesPatrimoniales';

const LDTabla = ({ datos, id }) => {
  const [fecha, setFecha] = useState('');
  const [cuenta, setCuenta] = useState('mercaderías');
  const [VP, setVP] = useState('');
  const [error, setError] = useState('');

  const [debe, setDebe] = useState('');
  const [haber, setHaber] = useState('');
  const [tipo, setTipo] = useState('');
  const token = document.cookie.replace('token=', '');
  const agregarAciento = () => {
    const monto = haber ? haber : debe;
    axios.post(config.APIURL_DESARROLLO + '/librodiario/agregarAciento/' + id, {
      fecha,
      cuenta,
      monto,
      vp: VP,
      operacion: 1,
      tipo

    }, {
      headers: {
        autorizacion: token
      }
    })
      .then(res => { console.log(res) })
      .catch(err => {
        console.log(err.response.data)
      })
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
      <tbody>

        {datos.length > 0 && datos.map(aciento => <Aciento aciento={aciento} />)}
        <tr>
          <td><input type="date" value={fecha} onChange={(e) => { setFecha(e.target.value) }} /></td>
          <td> <select name="select" data-show-subtext="true" data-live-search="true" onChange={(e) => {
            setCuenta(e.target.value);
            verificarCuenta(e.target.value);
          }}>
            {
              todasLasCuentas.map(cuenta => <option value={cuenta} >{cuenta}</option>
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
          <td>Brian Muñoz</td>
          <td><Button onClick={agregarAciento}>Add</Button></td>
        </tr>
      </tbody>

    </Table>
  )
}

export default LDTabla