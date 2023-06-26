import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import validacionDePassword from "../../helpers/validacionDePassword";
import getEdad from "../../helpers/obtenerEdad";
import axios from "axios";
import config from "../../config/config";
const Registro = () => {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkTYC, setCheckTYC] = useState(false);

  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();
  const token = document.cookie.replace("token=", "");
  useEffect(() => {
    if (token) navigate("/");
  }, []);
  const mostrarError = (mensajeDeError) => {
    setError(true);
    setMensaje(mensajeDeError);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const passwordValidacion = validacionDePassword(password);
    if (!email) {
      mostrarError("El campo email es obligatorio");

      return;
    } else if (!password) {
      setMensaje("Debe completar el campo password");

      return;
    } else if (!nombre) {
      setMensaje("Debe completar el campo nombre");

      return;
    } else if (!apellido) {
      setMensaje("Debe completar el campo apellido");
      return;
    } else if (!fechaNacimiento) {
      setMensaje("Debe ingresar su fecha de nacimiento");

      return;
    } else if (getEdad(fechaNacimiento) < 18) {
      setMensaje("Usted es menor de edad no puede registrarse en este sitio!");

      return;
    } else if (email !== email2) {
      setMensaje("Los emails no coinciden");

      return;
    } else if (password !== password2) {
      setMensaje("Las contraseñas no coinciden");

      return;
    } else if (passwordValidacion.esValido === false) {
      setMensaje(passwordValidacion.error);

      return;
    } else if (checkTYC === false) {
      setMensaje(
        "Si no acepta los términos y condiciones no podrá registrarse"
      );

      return;
    }
    axios
      .post(config.APIURL_DESARROLLO + "autorizacion/registro", {
        email,
        pass: password,
        nombre,
        apellido,
        fecha_nacimiento: fechaNacimiento,
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          setError(false);
          setExito(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        }
      })
      .catch((err) => {
        setMensaje(err.response.data.message);
      });
  };
  return (
    <Form onSubmit={submitHandle}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Tú email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confrirmar email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Confirmar tú email"
          value={email2}
          required
          onChange={(e) => {
            setEmail2(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Ingresa tu Apellido"
          value={apellido}
          onChange={(e) => {
            setApellido(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={fechaNacimiento}
          required
          onChange={(e) => {
            setFechaNacimiento(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Confirmar password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirmar password"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Acepto términos y condiciones"
          value={checkTYC}
          onClick={() => {
            setCheckTYC(!checkTYC);
          }}
        />
      </Form.Group>
      {error && (
        <Alert variant="danger" mt-5 mb-5>
          {mensaje}
        </Alert>
      )}
      {exito && (
        <Alert variant="success" mt-5 mb-5>
          Su usuario a sido creado, ahora puede usar su cuenta, será redirigido
          al login <Spinner></Spinner>
        </Alert>
      )}

      {checkTYC ? (
        <Button variant="outline-dark" type="submit">
          Registrarse
        </Button>
      ) : (
        <Button variant="outline-dark" type="submit" disabled>
          Registrarse
        </Button>
      )}
    </Form>
  );
};

export default Registro;
