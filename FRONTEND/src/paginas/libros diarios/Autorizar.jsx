import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config/config";
import { useParams } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";
import ModalMensaje from "../../componentes/ModalMensaje";

const Autorizar = () => {
  const token = document.cookie.replace("token=", "");
  const [usuarios, setUsuarios] = useState([]);
  const [inputUsuario, setInputUsuario] = useState("");
   const [modal, setModal] = useState({
    mostrar: false,
    mensaje: "",
    textColor: "",
    bgColor: "",
    titulo: ""
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
      .catch(()=>{
        setModal({
          mostrar: true,
          mensaje: "Hubo un error por favor intentelo más tarde!",
          bgColor: "danger",
          textColor: "light",
          titulo: 'Error de servidores'
        });
      });
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const eliminarUsuario = (id) => {
    
    if(id === parseInt(localStorage.getItem("userID"))){
      setModal({
        mostrar: true,
        mensaje: "No te puedes eliminar a ti mismo!",
        bgColor: "danger",
        textColor: "light",
        titulo: 'Error de usuario'
      });
    }
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
            mostrar: true,
            mensaje: "Se eliminó al usuario del id: " + id,
            bgColor: "danger",
            textColor: "light",
            titulo: 'Eliminado con éxito'
          });
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            obtenerUsuarios();
          }, 3000);
        }
      })
      .catch(()=>{
        setModal({
          mostrar: true,
          mensaje: "Hubo un error por favor intentelo más tarde!",
          bgColor: "danger",
          textColor: "light",
          titulo: 'Error de servidores'
        });
      });
  };

  const agregarUsuario = (e, id) => {
    e.preventDefault();
    if (!id || typeof parseInt(id) !== "number" || isNaN(id)) {
      setModal({
        mostrar: true,
        mensaje: "Por favor ingrese un id válido ",
        bgColor: "danger",
        textColor: "light",
        titulo: 'Error en el campo id'
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
            mostrar: true,
            mensaje: "Usuario: "+id+ ' ahora tiene acceso para trabajar en el libro: '+ID,
            bgColor: "light",
            textColor: "dark",
            titulo: 'Autorizacion creada!'
          });
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            obtenerUsuarios();
          }, 3000);
        }
      })
      .catch((err)=>{
        if(err.response.data.status === 400){
          setModal({
            mostrar: true,
            mensaje: err.response.data.message,
            bgColor: "danger",
            textColor: "light",
            titulo: 'Error de tipeo '
          });
          return;
        }else{
          setModal({
            mostrar: true,
            mensaje: "Hubo un error por favor intentelo más tarde!",
            bgColor: "danger",
            textColor: "light",
            titulo: 'Error de servidores'
          });



        }
    
      });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">

      <ModalMensaje mostrar={modal.mostrar} setMostrar={()=>{setModal({
    mostrar: false,
    mensaje: "",
    textColor: "",
    bgColor: "",
    titulo: ""
      })}} mensaje={modal.mensaje} titulo={modal.titulo} bgColor={modal.bgColor} textColor={modal.textColor}></ModalMensaje>
     

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

      <h2 className="mb-5">Usuarios autorizados</h2>

      <ul>
        {usuarios.length > 0 &&
          !loading &&
          usuarios.map((item) => {
            return (
              <li style={{ width: "260px" }} className="d-flex border border shadow rounded p-3 mb-5 justify-content-between">
                <span >{'ID: '+item.autor }<br></br>{item.email}</span>{" "}
                <button
                  className="btn btn-outline-danger " style={{height: '40px'}}
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
