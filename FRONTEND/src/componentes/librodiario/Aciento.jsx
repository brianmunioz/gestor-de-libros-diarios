import React from 'react'

const Aciento = ({aciento}) => {
    const debe = 'pn'
    console.log(aciento)
  return (
    <tr>
    <td>{aciento.fecha}</td>
    <td>{aciento.cuenta}</td>
    <td>{aciento.vp}</td>
    {
        aciento.vp === debe ?
        <>
        <td>{aciento.monto}</td>
        <td></td>
        </>:<>
        <td></td>
        <td>{aciento.monto}</td>
        </>
    }
    <td>{aciento.tipo}</td>
    <td>{aciento.autor}</td>
  </tr>  )
}

export default Aciento