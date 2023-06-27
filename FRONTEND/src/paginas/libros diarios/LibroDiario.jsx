import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert, Modal } from "react-bootstrap";
import config from "../../config/config";
import axios from "axios";
import { todasLasCuentas } from "../../helpers/todasLasCuentas";
import { variacionesPatrimoniales } from "../../helpers/variacionesPatrimoniales";
import LDTabla from "../../componentes/librodiario/LDTabla";
import LibroMayor from "../../componentes/librodiario/LibroMayor";
import BalanceSumasYSaldos from "../../componentes/librodiario/BalanceSumasYSaldos";
import html2pdf from "html2pdf.js";

const LibroDiario = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const token = document.cookie.replace("token=", "");
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [descripcionOperacion, setDescripcionOperacion] = useState("");
  const [mensajeOperacion, setMensajeOperacion] = useState("");
  const [modal, setModal] = useState(false);
  const [mayor, setMayor] = useState(false);
  const [trabajando, setTrabajando] = useState(
    sessionStorage.getItem("operacion_" + ID) ? true : false
  );
  const [sumassaldos, setSumassaldos] = useState(false);
  const [cuentaMayor, setCuentaMayor] = useState("MERCADERÍAS");
  const [operacionCreada, setOperacionCreada] = useState(false);

  const componentRef = useRef();

  const generatePdf = () => {
    let extra = "librodiario";
    if(mayor){
      extra = "Mayor_"+cuentaMayor;
    }else if(sumassaldos){
      extra="sumasYsaldos";
    }
    const opt = {
      margin: 1,
      filename: extra+"_"+"libro_diario:"+ID+".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(componentRef.current).save();
  };

  let puedeEditar = sessionStorage.getItem("operacion_" + ID) ? true : false;
  const obtenerAcientos = () => {
    axios
      .get(config.APIURL_DESARROLLO + "/librodiario/verAcientos/" + ID, {
        headers: {
          autorizacion: token,
        },
      })
      .then((res) => {
        const arregloOperaciones = res.data.map((element) => {
          //1-obtener todas las operaciones
          return element.operacion;
        });

        const cantidadOperaciones = new Set(arregloOperaciones); //2-Eliminar elementos repetidos
        const totalOperaciones = [...cantidadOperaciones]; //Con un formato mejor...
        let arregloAMostrar = []; //En este arreglo se mostraran los datos en forma ordenada
        for (let i = 0; i < totalOperaciones.length; i++) {
          //3-Ordenar los debes y haberes de cada operacion
          //4-Dividimos las cuentas del debe y del haber
          let descripcion_operacion;
          const cuentasDebe = res.data.filter((element) => {
            const esDebe = variacionesPatrimoniales.debe.some(
              (vp) => vp === element.variacion_patrimonial
            );
            return element.operacion === totalOperaciones[i] && esDebe;
          });
          const cuentasHaber = res.data.filter((element) => {
            const esHaber = variacionesPatrimoniales.haber.some(
              (vp) => vp === element.variacion_patrimonial
            );
            return element.operacion === totalOperaciones[i] && esHaber;
          });
          descripcion_operacion = cuentasDebe[0].descripcion;

          //5- agregamos los arreglos en nuestro arreglo final
          // y al final de la iteracion se guardaran los arreglos de forma que se ordenen por operacion y primero debe y luego haber de cada operación
          arregloAMostrar.push(...cuentasDebe);
          arregloAMostrar.push(...cuentasHaber);
          arregloAMostrar.push({ descripcion_operacion });
        }
        setDatos(arregloAMostrar);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/");
        }
      });
  };
  useEffect(() => {
    obtenerAcientos();
  }, []);
  const totalDebe = (data) => {
    let total = 0;
    data.filter((element) => {
      const esDebe = variacionesPatrimoniales.debe.some(
        (vp) => vp === element.variacion_patrimonial
      );
      if (esDebe) {
        total += parseInt(element.monto);
        return element;
      }
    });
    return total;
  };
  const totalHaber = (data) => {
    let total = 0;
    data.filter((element) => {
      const esHaber = variacionesPatrimoniales.haber.some(
        (vp) => vp === element.variacion_patrimonial
      );
      if (esHaber) {
        total += parseInt(element.monto);
        return element;
      }
    });
    return total;
  };
  const guardarNuevaOperacion = () => {
    if (!descripcionOperacion) {
      setModal(!modal);
      setMensajeOperacion("Debe completar la descripcion de la operacion");
      return;
    }
    setTrabajando(true);
    setMensajeOperacion("");
    sessionStorage.setItem("operacion_" + ID, descripcionOperacion);
    puedeEditar = sessionStorage.getItem("operacion_" + ID);
  };
  const finalizarOperacion = () => {
    if (
      sessionStorage.getItem("acientos_" + ID) &&
      !sessionStorage.getItem("operacion_" + ID)
    ) {
      sessionStorage.removeItem("acientos_" + ID);
    }
    if (!sessionStorage.getItem("acientos_" + ID)) {
      setModal(!modal);
      setMensajeOperacion(
        "Debe agregar acientos para poder guardar la operación"
      );
    }
    const acientosDelSessionStorage = JSON.parse(
      sessionStorage.getItem("acientos_" + ID)
    );
    if (
      totalDebe(acientosDelSessionStorage) !==
      totalHaber(acientosDelSessionStorage)
    ) {
      setModal(!modal);
      setMensajeOperacion(
        "ERROR DE BALANCE DE OPERACIÓN, no se puede guardar la operación hasta que el debe y el haber no coincidan"
      );
      return;
    }
    setTrabajando(false);

    setMensajeOperacion("");
    axios
      .post(
        config.APIURL_DESARROLLO + "/librodiario/agregaroperacion/" + ID,
        {
          descripcion: sessionStorage.getItem("operacion_" + ID),
          libro_diario: ID,
        },
        {
          headers: {
            autorizacion: token,
          },
        }
      )
      .then((res) => {
        const acientosDeOperacionNueva = JSON.parse(
          sessionStorage.getItem("acientos_" + ID)
        );

        acientosDeOperacionNueva.map((aciento) => {
          axios
            .post(
              config.APIURL_DESARROLLO + "/librodiario/agregarAciento/" + ID,
              {
                cuenta: aciento.cuenta,
                monto: aciento.monto,
                vp: aciento.variacion_patrimonial,
                operacion: res.data.insertId,
                tipo: aciento.tipo,
              },
              {
                headers: {
                  autorizacion: token,
                },
              }
            )
            .then(() => {})
            .catch(() => {
              setModal(!modal);
              setMensajeOperacion("No se pudo guardar unos de los acientos");
              return;
            });
        });
        sessionStorage.removeItem("acientos_" + ID);
        sessionStorage.removeItem("operacion_" + ID);
        setModal(!modal);

        setMensajeOperacion(
          "Operacion creada con éxito, id de operación: " + res.data.insertId
        );
        setIsLoading(true);
        setOperacionCreada(true);
        setTimeout(() => {
          setMensajeOperacion("");
          setModal(false);
          setTimeout(() => {
            setOperacionCreada(false);
          }, 1000);

          setIsLoading(false);
        }, 3000);
        obtenerAcientos();
      })
      .catch((err) => {
        setModal(!modal);
        setMensajeOperacion("Hubo un error, por favor intentelo más tarde!");
      });
  };
  const cancelarOperacion = () => {
    setTrabajando(false);

    sessionStorage.removeItem("acientos_" + ID);
    sessionStorage.removeItem("operacion_" + ID);
    setModal(!modal);
    setMensajeOperacion("Operacion cancelada");
  };
  return (
    <div>
      <div className="d-flex align-items-start flex-column">
        <div className="shadow rounded p-3 mb-3">
          <Button
            variant="dark"
            className="mb-3"
            onClick={() => {
              setSumassaldos(true);
            }}
          >
            Ver balance de comprobacion de sumas y saldos
          </Button>
          <Modal show={sumassaldos} closeButton>
            <div ref={componentRef}>
              <Modal.Header>Libro de balance de sumas y saldos</Modal.Header>
              <Modal.Body style={{ overflow: "auto" }}>
                <BalanceSumasYSaldos
                  style={{ overflowY: "scroll" }}
                  datos={datos}
                ></BalanceSumasYSaldos>
              </Modal.Body>
            </div>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => {
                  setSumassaldos(!sumassaldos);
                }}
              >
                Cerrar
              </Button>
              <Button variant="warning" onClick={generatePdf}>
                Generar PDF
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="vistaMayor mb-5">
            <select
              name="select"
              key={"select"}
              onChange={(e) => {
                setCuentaMayor(e.target.value);
              }}
              style={{ width: "150px" }}
              value={cuentaMayor}
            >
              {todasLasCuentas.map((cuenta) => (
                <option value={cuenta} key={cuenta}>
                  {cuenta}
                </option>
              ))}
            </select>{" "}
            <Button
              variant="outline-success"
              onClick={() => {
                setMayor(true);
                setCuentaMayor(cuentaMayor);
              }}
            >
              Ver Libro mayor
            </Button>
            <div>
              <Modal show={mayor} closeButton>
                <div ref={componentRef}>
                  <Modal.Header>Libro Mayor: {cuentaMayor}</Modal.Header>
                  <Modal.Body style={{ overflow: "auto" }}>
                    <LibroMayor datos={datos} cuenta={cuentaMayor}></LibroMayor>
                  </Modal.Body>
                </div>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setMayor(!mayor);
                    }}
                  >
                    Cerrar
                  </Button>

                  <Button variant="warning" onClick={generatePdf}>
                    Generar PDF
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          overflowY: "hidden",
        }}
      >
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Guardando...</span>
          </Spinner>
        ) : (
          <div ref={componentRef}>
            <LDTabla datos={datos} id={ID} editar={puedeEditar}></LDTabla>
          </div>
        )}
        <Button variant="warning" onClick={generatePdf}>
              Generar PDF del libro diario
            </Button>

        <div className="d-flex justify-content-between">
          {mensajeOperacion === "Operación creada!" && (
            <Alert variant="success">{mensajeOperacion}</Alert>
          )}
           
          <div className="d-flex justify-content-between my-3 ">
            {!trabajando ? (
              <>
                <input
                  type="text"
                  placeholder="Ingrese descripción de la operacion"
                  className="p-1 border-0 border-bottom border-primary"
                  value={descripcionOperacion}
                  onChange={(e) => {
                    setDescripcionOperacion(e.target.value);
                  }}
                />
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="outline-primary"
                  onClick={guardarNuevaOperacion}
                >
                  Empezar nueva operacion
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="success"
                  style={{ marginRight: "9px" }}
                  onClick={finalizarOperacion}
                >
                  Finalizar operación
                </Button>
                <Button variant="danger" onClick={cancelarOperacion}>
                  Cancelar Operacion
                </Button>
              </>
            )}
           

            <Modal show={modal} closeButton>
              <Modal.Header
                className={
                  operacionCreada
                    ? "bg-success text-light border-0"
                    : "bg-danger text-light border-0"
                }
              ></Modal.Header>
              <Modal.Body
                className={
                  operacionCreada
                    ? "bg-success text-light border-0"
                    : "bg-danger text-light border-0"
                }
              >
                {mensajeOperacion}
              </Modal.Body>
              <Modal.Footer
                className={
                  operacionCreada
                    ? "bg-success text-light border-0"
                    : "bg-danger text-light border-0"
                }
              >
                {!operacionCreada && (
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Cerrar
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroDiario;
