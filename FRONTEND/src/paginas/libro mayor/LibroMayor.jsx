import React from 'react'
import { Table } from 'react-bootstrap'

const LibroMayor = ({datos}) => {
  return (<>
  <h2>{datos.cuenta}</h2>
    <Table>
          <thead>
        <tr>
          <th>Fecha</th>
          <th>Cuenta</th>
          <th>DEBE</th>
          <th>HABER</th>
          <th>Operación</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
      {datos && datos.map(aciento =>   <tr>
            <td>{aciento.fecha}</td>
            <td>{aciento.cuenta}</td>
            <td>{aciento.monto}</td>
            <td></td>
            <td></td>
            <td>1000</td>
        </tr>)}
      </tbody>
    </Table>
    </>
  )
}

export default LibroMayor