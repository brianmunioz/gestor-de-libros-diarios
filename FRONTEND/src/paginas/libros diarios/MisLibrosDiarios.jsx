import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MiniCard from '../../componentes/librodiario/MiniCard'
import axios from 'axios';
import config from '../../config/config'
import { Button } from 'react-bootstrap';

const MisLibrosDiarios = () => {
  const navigate = useNavigate();
  const token = document.cookie.replace('token=', '');
  const [librosDiarios, setLibrosDiarios] = useState([]);
  useEffect(() => {
    axios.get(config.APIURL_DESARROLLO + '/librodiario/verLDUsuarios', {
      headers: {
        autorizacion: token
      }
    })
      .then(res => setLibrosDiarios(res.data))
      .catch(err => {
        if (err.status === 401) {
          navigate('/');
        }
      })
  }, [])
  return (
    <div className='container'>
      <Button  className='mb-3'><Link className='text-white' to='/agregarLD'>Agregar Nuevo libro diario</Link></Button>
      {
        librosDiarios.length > 0 ?
          <>
            {librosDiarios &&
              librosDiarios.map((libro) => {
                return <MiniCard titulo={libro.nombre} id={libro.id}  ></MiniCard>
              })
            }

          </>
          :
          <p>No está trabajando en ningún libro diario</p>
      }

    </div>
  )
}

export default MisLibrosDiarios