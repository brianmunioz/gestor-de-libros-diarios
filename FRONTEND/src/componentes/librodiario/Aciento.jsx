import React, { useEffect, useState } from 'react'

const Aciento = ({ aciento }) => {
  const [debe, setDebe] = useState(false)
  useEffect(() => {
    if (aciento.variacion_patrimonial === 'PN' ||
      aciento.variacion_patrimonial === 'A+') {
      setDebe(true)

    }
  }, []);



  return (
    <tr>
      <td>{aciento.fecha}</td>
      <td>{aciento.cuenta}</td>
      <td>{aciento.variacion_patrimonial}</td>
      {
        debe === true ?
          <>
            <td>{aciento.monto}</td>
            <td></td>
          </> : <>
            <td></td>
            <td>{aciento.monto}</td>
          </>
      }
      <td>{aciento.tipo}</td>
      <td>{aciento.autor}</td>
      <td>{aciento.operacion}</td>

    </tr>)
}

export default Aciento