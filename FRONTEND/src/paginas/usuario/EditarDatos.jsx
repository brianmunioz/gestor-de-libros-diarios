import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config/config";
import { Alert, Button, Form } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

const EditarDatos = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const token = document.cookie.replace("token=", "");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        config.APIURL_DESARROLLO +
          "/usuarios/obtenerUsuario/" +
          localStorage.getItem("userID")
      )
      .then((res) => {
        setEmail(res.data[0].email);
        setNombre(res.data[0].nombre);
        setApellido(res.data[0].apellido);
      })
      .catch(
        ()=>{
          setError(true);
      setMensaje("Hubo un error en la carga, recargue para arreglar el error, si el error persiste por favor intentelo más tarde!");
  
        }
      );
  }, []);
  const editarMisDatos = (e) => {
    e.preventDefault();
    if (!nombre) {
      setError(true);
      setMensaje("El campo nombre no debe estar vacío");
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (!apellido) {
      setError(true);
      setMensaje("El campo apellido no debe estar vacío");
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (!email) {
      setError(true);
      setMensaje("El campo email no debe estar vacío");
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (email.includes(" ")) {
      setError(true);
      setMensaje("El campo email no debe contener espacios");
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.lastIndexOf("@") > email.lastIndexOf(".") ||
      email.split("").filter(function (c) {
        return c === "@";
      }).length != 1 ||
      email.split("").filter(function (c) {
        return c === ".";
      }).length != 1 ||
      email[email.lastIndexOf("@") + 1] === "." ||
      email.lastIndexOf("@") === 0 ||
      email.lastIndexOf(".") === email.length - 1
    ) {
      setError(true);
      setMensaje("El campo email tiene un formato incorrecto");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    axios
      .patch(
        config.APIURL_DESARROLLO + "usuarios/editarUsuario",
        {
          nombre,
          apellido,
          email,
        },
        {
          headers: { autorizacion: token },
        }
      )
      .then((res) => {
        setError(false);
        setExito(true);
        setMensaje("Se han modificado sus datos! ");
        setTimeout(() => {
          setExito(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/librosdiariosenlosquetrabajo");
        }
        setMensaje(err.response.data.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };
  return (
    <section>
      <h2>Editar mis datos</h2>
      <Form onSubmit={editarMisDatos}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder=""
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="apellido">
          <Form.Label>Apellido: </Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            placeholder=""
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{mensaje}</Alert>}
        {exito && <Alert variant="sucess">{mensaje}</Alert>}

        <Button variant="outline-dark" type="submit">
          Editar mis datos
        </Button>
      </Form>
    </section>
  );
};

export default EditarDatos;
