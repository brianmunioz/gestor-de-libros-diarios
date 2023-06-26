import axios from "axios";
import React, { useState } from "react";
import config from "../../config/config";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import validacionDePassword from "../../helpers/validacionDePassword";
const CambiarPassword = () => {
  const [passActual, setPassActual] = useState("");
  const [passNueva, setPassNueva] = useState("");
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);
  const [showPassActual, setShowPassActual] = useState(false);
  const [showPassNueva, setShowPassNueva] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const token = document.cookie.replace("token=", "");
  const navigate = useNavigate();

  const cambiarpassHandler = (e) => {
    e.preventDefault();
    const verificarPassNueva = validacionDePassword(passNueva);
    if (!verificarPassNueva.esValido) {
      setError(true);
      setMensaje("ERROR Contraseña nueva: " + verificarPassNueva.error);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    } else if (!passActual.trim()) {
      setError(true);
      setMensaje("ERROR Contraseña actual: " + verificarPassNueva.error);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    axios
      .patch(
        config.APIURL_DESARROLLO + "usuarios/cambiarpass",
        {
          passActual,
          passNueva,
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
        const error = JSON.parse(err.response.data.message);
        if (err.status === 401) {
          navigate("/librosdiariosenlosquetrabajo");
        }
        if (error.noPuedeModificar) {
          setMensaje("ERROR: " + error.mensaje);
        } else if (error.passNueva) {
          setMensaje("ERROR Contraseña nueva: " + error.mensaje);
        } else {
          setMensaje("ERROR Contraseña actual: " + error.mensaje);
        }
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };
  return (
    <section>
      <h2>Cambiar contraseña</h2>
      <Form onSubmit={cambiarpassHandler}>
        <Form.Group className="mb-3" controlId="passActual">
          <Form.Label>Ingrese su constraseña actual </Form.Label>
          <div>
            {" "}
            <Form.Control
              type={showPassActual ? "text" : "password"}
              name="passActual"
              placeholder=""
              value={passActual}
              onChange={(e) => setPassActual(e.target.value)}
            />{" "}
            <Form.Check
              type="checkbox"
              label="Mostrar"
              onClick={() => setShowPassActual(!showPassActual)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passNueva">
          <Form.Label>Ingrese su nueva contraseña </Form.Label>
          <div>
            {" "}
            <Form.Control
              type={showPassNueva ? "text" : "password"}
              name="passNueva"
              placeholder=""
              value={passNueva}
              onChange={(e) => setPassNueva(e.target.value)}
            />
            <Form.Check
              type="checkbox"
              label="Mostrar"
              onClick={() => {
                setShowPassNueva(!showPassNueva);
              }}
            />
          </div>
        </Form.Group>

        {error && <Alert variant="danger">{mensaje}</Alert>}
        {exito && <Alert variant="success">{mensaje}</Alert>}

        <Button variant="outline-dark" type="submit">
          Cambiar password{" "}
        </Button>
      </Form>
    </section>
  );
};

export default CambiarPassword;
