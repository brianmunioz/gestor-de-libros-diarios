import React, { useEffect, useState } from 'react'
import config from '../../config/config';
import axios from 'axios';
import { formatearFecha } from '../../helpers/formatearFecha';

const Usuario = ({id}) => {
    const [datos, setDatos] = useState('');
    const [error , setError ] = useState("");
    useEffect(()=>{
        axios.get(config.APIURL_DESARROLLO+'/usuarios/obtenerUsuario/'+id)
        .then((res)=>{setDatos(res.data[0])})
        .catch(()=>{
          setError("No existen datos sobre el usuario")
        })
    })
  return (
    <div className="p-3 d-inline-block shadow">
{datos ? <>
    <h2>ID: <span className='text-secondary fw-lighter'>{id}</span></h2>

<h2>Nombre: <span className='text-secondary fw-lighter'>{datos.nombre}</span></h2>
<h2>Apellido: <span className='text-secondary fw-lighter'>{datos.apellido}</span></h2>
<h2>Fecha de nacimiento: <span className='text-secondary fw-lighter'>{formatearFecha(datos.fecha_nacimiento)}</span></h2>
<h2>Email: <span className='text-secondary fw-lighter'>{datos.email}</span></h2>
<h2>Registrado desde: <span className='text-secondary fw-lighter'>{formatearFecha(datos.fecha_creacion)}</span></h2>
</>:
<h2>{error}</h2>}
    </div>
  )
}

export default Usuario