import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config/config'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState('');
  const token = document.cookie.replace('token=', '');
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  useEffect(()=>{
    if(token) navigate('/');
  },[])
  const mostrarError = (mensajeDeError) => {
    setError(true);
    setMensaje(mensajeDeError);
    setTimeout(() => { setError(false) }, 2000);
  }
  const submitHandle = (e) => {
    e.preventDefault();
    setError(false);
    if (!email) {
      mostrarError('El campo email es obligatorio');
      return
    } else if (!password) {
      mostrarError('Debe completar el campo password');
      return
    }


    axios.post(config.APIURL_DESARROLLO + 'autorizacion/iniciarSesion', {
      email,
      pass: password,
      recordar
    })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          document.cookie = `token=${res.data.token}; max-age=${60 * 300}; path=/; samesite=strict`;
          sessionStorage.setItem('user',res.data.usuario.nombre+' '+res.data.usuario.apellido);

          setError(false);
          setExito(true);
          setTimeout(() => { window.location = '/' }, 3000);
        }
      })
      .catch((err) => {
        console.log(err)
        mostrarError(err.response.data.message)
      }
      )



  }

  return (
    <Form onSubmit={submitHandle}>
      <Form.Group className="mb-3"  >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Tú email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Check type="checkbox" label="Recordar" onClick={() => setRecordar(!recordar)} />
      </Form.Group>
      {error && <Alert variant='danger' mt-5 mb-5>{mensaje}</Alert>}
      {exito && <Alert variant='success' mt-5 mb-5>Ingresando a su cuenta...</Alert>}
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
    </Form>
  )
}

export default Login