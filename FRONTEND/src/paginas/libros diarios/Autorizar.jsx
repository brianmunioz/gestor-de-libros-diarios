import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config/config";
import { useParams } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";

const Autorizar = () => {
  const token = document.cookie.replace("token=", "");
  const [usuarios, setUsuarios] = useState([]);
  const [inputUsuario, setInputUsuario] = useState("");
  const [modal, setModal] = useState({
    show: false,
    mensaje: "",
    color: "",
    textoColor: "",
  });
  const [loading, setLoading] = useState(false);

  const { ID } = useParams();
  const obtenerUsuarios = () => {
    axios
      .get(
        config.APIURL_DESARROLLO +
          "/autorizacion/obtenerusuariosautorizados/" +
          ID,

        {
          headers: {
            autorizacion: token,
          },
        }
      )
      .then((res) => {
        setUsuarios(res.data);
      })
      .catch(console.log);
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const eliminarUsuario = (id) => {
    axios
      .delete(config.APIURL_DESARROLLO + "/autorizacion/eliminarAutorizacion", {
        headers: {
          autorizacion: token,
        },
        data: {
          libro_diario: ID,
          id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setModal({
            show: true,
            mensaje: "Se eliminó al usuario del id: " + id,
            color: "danger",
            textoColor: "light",
          });
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            obtenerUsuarios();
          }, 3000);
        }
      })
      .catch(console.log);
  };

  const agregarUsuario = (e, id) => {
    e.preventDefault();
    if (!id || typeof id !== "number") {
      setModal({
        show: true,
        mensaje: "Por favor ingrese un id válido ",
        color: "danger",
        textoColor: "light",
      });
      return;
    }
    axios
      .post(
        config.APIURL_DESARROLLO + "/autorizacion/agregarautorizacion",
        {
          autor: parseInt(id),
          libro_diario: ID,
        },
        {
          headers: { autorizacion: token },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setModal({
            show: true,
            mensaje: "Usuario creado con éxito!",
            color: "light",
            textoColor: "dark",
          });
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            obtenerUsuarios();
          }, 3000);
        }
      })
      .catch(console.log);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Modal show={modal.show} closeButton>
        <Modal.Header
          className={
            "bg-" +
            modal.color +
            " border-0" +
            " text-" +
            modal.textoColor +
            " text-" +
            modal.textoColor
          }
        >
          {modal.mensaje}
        </Modal.Header>

        <Modal.Footer
          className={
            "bg-" + modal.color + " border-0" + " text-" + modal.textoColor
          }
        >
          <Button
            variant={modal.color !== "danger" ? "danger" : "outline-light"}
            onClick={() => {
              setModal({
                show: false.show,
                mensaje: "",
                color: "",
                textoColor: "",
              });
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <form
        className="d-flex justify-content-between mb-5"
        onSubmit={(e) => agregarUsuario(e, inputUsuario)}
      >
        <input
          type="number"
          value={inputUsuario}
          onChange={(e) => {
            setInputUsuario(e.target.value);
          }}
          style={{ padding: "6px 12px", marginRight: "10px" }}
          placeholder="Ingrese ID del usuario"
        />
        <input
          type="submit"
          value={"Autorizar usuario"}
          className="btn btn-outline-dark"
        />
      </form>

      <h2>Usuarios autorizados</h2>

      <ul>
        {usuarios.length > 0 &&
          !loading &&
          usuarios.map((item) => {
            return (
              <li>
                <span style={{ marginRight: "20px" }}>{item.email}</span>{" "}
                <button
                  className="btn btn-outline-danger "
                  onClick={() => eliminarUsuario(item.autor)}
                >
                  eliminar
                </button>
              </li>
            );
          })}
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        )}
        {usuarios.length === 0 && !loading && (
          <span className="text-secondary">
            Agregue a su equipo de trabajo!
          </span>
        )}
      </ul>
    </div>
  );
};

export default Autorizar;
