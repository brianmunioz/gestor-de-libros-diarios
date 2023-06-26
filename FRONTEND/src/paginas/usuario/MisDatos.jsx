import React from 'react'
import Usuario from '../../componentes/usuario/Usuario'
import { useParams } from 'react-router-dom';

const MisDatos = () => {
    const {usuarioID} = useParams();

  return (
    <section className='d-flex justify-content-center align-items-center'>
        <Usuario id={usuarioID}></Usuario>
    </section>
  )
}

export default MisDatos