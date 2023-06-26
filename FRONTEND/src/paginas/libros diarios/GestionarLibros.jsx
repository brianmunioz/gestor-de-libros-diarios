import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import axios from "axios";

const GestionarLibros = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const token = document.cookie.replace("token=", "");
  const [librosDiarios, setLibrosDiarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadLibros, setLoadLibros] = useState(false);
  const [borrado, setBorrado] = useState(false);
  const [id, setId] = useState("");
  const obtenerLibros = () => {
    axios
      .get(config.APIURL_DESARROLLO + "/librodiario/verLDUsuarios", {
        headers: {
          autorizacion: token,
        },
      })
      .then((res) => setLibrosDiarios(res.data))
      .catch((err) => {
        if (err.status === 401) {
          navigate("/");
        }
      });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (e) => {
    setId(e.target.id);
    setNombre(e.target.name);
    setShow(true);
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  const eliminarLibroDiario = () => {
    axios.delete(config.APIURL_DESARROLLO + "librodiario/eliminarLibroDiario/"+id,{
        headers: {autorizacion: token}
    })
    .then(res=>{
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setBorrado(true);
          setLoadLibros(true);
          obtenerLibros();
          setTimeout(() => {
    
            setLoadLibros(false);
    
            setShow(false);
            setBorrado(false);
          }, 3000);
        }, 2000);
    })
    .catch(err=>{
        if(err.status === 401){
            navigate("/librosdiariosenlosquetrabajo");
        }
    })

  };
  return (
    <div>
      <h2>Mis Libros diarios</h2>
      <div className="d-flex flex-column">
        {librosDiarios &&
          !loadLibros &&
          librosDiarios.map((libro) => {
            return (
              <Button
                variant="outline-danger"
                onClick={handleShow}
                className="mb-3"
                id={libro.id}
                name={libro.nombre}
              >
                {"Libro diario: " + libro.nombre + " - id: " + libro.id}
              </Button>
            );
          })}
        {loadLibros && <Spinner></Spinner>}
      </div>

      <Modal show={show} onHide={handleClose}>
        {!isLoading && !borrado ? (
          <Modal.Header closeButton>
            <Modal.Title>Libro diario: {nombre}</Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Header>
            <Modal.Title>Libro diario: {nombre}</Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body>
          {isLoading && !borrado && (
            <div className="d-flex justify-content-center w-100">
              <Spinner></Spinner>
            </div>
          )}
          {!isLoading && borrado && (
            <h2>
              Su libro diario a sido eliminado de nuestras bases de datos!
            </h2>
          )}
          {!isLoading && !borrado && (
            <>
              ¿Está seguro que desea borrar el libro diario{" "}
              <span className="text-danger">{nombre}</span> del id:{" "}
              <span className="text-danger">{id}</span>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isLoading && !borrado && (
            <>
              <Button variant="outline-dark" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="danger" onClick={eliminarLibroDiario}>
                Sí, Eliminar!
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionarLibros;
