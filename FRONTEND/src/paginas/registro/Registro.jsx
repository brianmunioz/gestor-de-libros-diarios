import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import validacionDePassword from '../../helpers/validacionDePassword';
import getEdad from '../../helpers/obtenerEdad';
const Registro = () => {
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [checkTYC, setCheckTYC] = useState(false);


  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();


  const submitHandle = (e) => {
    e.preventDefault();
    const passwordValidacion = validacionDePassword(password);
    if (!email) {
      setError(true);
      setMensaje('El campo email es obligatorio')
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (!password) {
      setError(true);
      setMensaje('Debe completar el campo password')
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (!nombre) {
      setError(true);
      setMensaje('Debe completar el campo nombre')
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (!apellido) {
      setError(true);
      setMensaje('Debe completar el campo apellido');
      setTimeout(() => { setError(false) }, 2000)

      return

    } else if (!fechaNacimiento) {
      setError(true);
      setMensaje('Debe ingresar su fecha de nacimiento')
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (getEdad(fechaNacimiento) < 18) {
      setError(true);
      setMensaje('Usted es menor de edad no puede registrarse en este sitio!')
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (email !== email2) {
      setError(true);
      setMensaje('Los emails no coinciden')
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (password !== password2) {
      setError(true);
      setMensaje('Las contraseñas no coinciden');
      setTimeout(() => { setError(false) }, 2000)

      return
    } else if (passwordValidacion.esValido === false) {
      setError(true);
      setMensaje(passwordValidacion.error);
      setTimeout(() => { setError(false) }, 2000)
      return
    } else if (checkTYC === false) {
      setError(true);
      setMensaje('Si no acepta los términos y condiciones no podrá registrarse');
      setTimeout(() => { setError(false) }, 2000)
      return
    }

    setExito(true);
    setTimeout(() => { navigate('/login') }, 3000)

  }
  return (
    <Form onSubmit={submitHandle}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Tú email" value={email} required onChange={(e) => { setEmail(e.target.value) }} />


      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confrirmar email</Form.Label>
        <Form.Control type="email" placeholder="Confirmar tú email" value={email2} required onChange={(e) => { setEmail2(e.target.value) }} />


      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" required placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />


      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" required placeholder="Ingresa tu Apellido" value={apellido} onChange={(e) => { setApellido(e.target.value) }} />


      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control type="date" value={fechaNacimiento} required onChange={(e) => { setFechaNacimiento(e.target.value) }} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirmar password</Form.Label>
        <Form.Control type="password" placeholder="Confirmar password" value={password2} onChange={(e) => { setPassword2(e.target.value) }} />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Acepto términos y condiciones" value={checkTYC} onClick={() => { setCheckTYC(!checkTYC) }} />
      </Form.Group>
      {error && <Alert variant='danger' mt-5 mb-5>{mensaje}</Alert>}
      {exito && <Alert variant='success' mt-5 mb-5>Su usuario a sido creado, ahora puede usar su cuenta, será redirigido al login...</Alert>}

      {checkTYC ?
        <Button variant="primary" type="submit" >
          Registrarse
        </Button>
        :
        <Button variant="primary" type="submit" disabled >
          Registrarse
        </Button>

      }


    </Form>)
}

export default Registro