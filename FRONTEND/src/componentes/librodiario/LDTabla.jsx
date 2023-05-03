import React from 'react';
import { Table } from 'react-bootstrap';
import Aciento from './Aciento';

const LDTabla = ({datos}) => {
  return (
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Cuenta</th>
          <th>VP</th>
          <th>DEBE</th>
          <th>HABER</th>
          <th>tipo</th>
          <th>autor</th>
        </tr>
      </thead>
      <tbody>
       
      {datos.length > 0 &&
        datos.map(aciento=> <Aciento aciento={aciento}/>)
      }
      </tbody>
    </Table>
          )
}

export default LDTabla