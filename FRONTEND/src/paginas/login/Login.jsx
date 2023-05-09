import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();
  const submitHandle = (e) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      setMensaje('El campo email es obligatorio');
      setTimeout(() => { setError(false) }, 2000);
      return
    } else if (!password) {
      setError(true);
      setMensaje('Debe completar el campo password');
      setTimeout(() => { setError(false) }, 2000);
      return
    }
    setExito(true);
    setTimeout(() => { navigate('/dashboard') }, 3000);
    
  }
  return (
    <Form onSubmit={submitHandle}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Tú email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordar" />
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