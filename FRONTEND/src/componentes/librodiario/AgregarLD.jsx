import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';

const AgregarLD = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const token = document.cookie.replace('token=', '');
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('no hay mensaje xd');
  const [creado, setCreado] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nombreEmpresa) {
      setError(true)
      setMensaje('Debe ingresar el nombre de la empresa a la que pertenece el libro diario')

      return
    }
    axios.post(config.APIURL_DESARROLLO + '/librodiario/agregarLibroDiario', {
      nombre: nombreEmpresa
    }, {
      headers: {
        autorizacion: token
      }
    })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          setError(false);
          setCreado(true);
          setMensaje('Se creo libro diario con éxito');
          setTimeout(() => { navigate('/mislibrosdiarios') }, 3000)
        }
      })
      .catch((err) => {
        console.log(err)

        if (err.status === 401) navigate('/')
        setError(true);
        setMensaje('Error de consulta')
      })

  }


  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre de tú empresa</Form.Label>
        <Form.Control type="text" value={nombreEmpresa} onChange={(e) => { setNombreEmpresa(e.target.value) }} placeholder="Ingrese el nombre de la empresa" />

      </Form.Group>
      {error && <Alert variant='danger'>{mensaje}</Alert>}
      {creado && <Alert variant='success'>{mensaje}</Alert>}

      <Button variant="primary" type="submit">
        Submit
      </Button>


    </Form>)
}

export default AgregarLD