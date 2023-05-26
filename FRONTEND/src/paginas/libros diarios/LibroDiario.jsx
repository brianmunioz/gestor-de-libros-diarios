import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import config from "../../config/config";
import axios from "axios";
import { todasLasCuentas } from "../../helpers/todasLasCuentas";
import { variacionesPatrimoniales } from "../../helpers/variacionesPatrimoniales";
import LDTabla from "../../componentes/librodiario/LDTabla";

const LibroDiario = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const token = document.cookie.replace("token=", "");
  const [datos, setDatos] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [nuevaOperacion, setNuevaOperacion] = useState("");
  
const obtenerAcientos = ()=>{
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
        for (let i = 0; i < totalOperaciones; i++) {
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
            if (esHaber) descripcion_operacion = element.descripcion;
            return element.operacion === totalOperaciones[i] && esHaber;
          });
          //5- agregamos los arreglos en nuestro arreglo final
          // y al final de la iteracion se guardaran los arreglos de forma que se ordenen por operacion y primero debe y luego haber de cada operación
          arregloAMostrar.push(...cuentasDebe);
          arregloAMostrar.push(...cuentasHaber);
          arregloAMostrar.push({ descripcion_operacion });
        }

        setDatos(arregloAMostrar);
      })
      .catch((err) => console.log(err));
}
  useEffect(() => {
   obtenerAcientos();
  }, []);
  const totalDebe = () => {
    let total = 0;
    datos.filter((element) => {
      const esDebe = variacionesPatrimoniales.debe.some(
        (vp) => vp === element.variacion_patrimonial
      );
      if (esDebe) {
        total += element.monto;
        return element;
      }
    });
    return total;
  };
  const totalHaber = () => {
    let total = 0;
    datos.filter((element) => {
      const esHaber = variacionesPatrimoniales.haber.some(
        (vp) => vp === element.variacion_patrimonial
      );
      if (esHaber) {
        total += element.monto;
        return element;
      }
    });
    return total;
  };
  const guardarAcientos = () => {
    if (localStorage.getItem("Acientos")) {
      const acientosGuardados = JSON.parse(localStorage.getItem("Acientos"));      
      const ultimoIDOperacion =
        !nuevaOperacion && datos.length > 0
          ? datos[datos.length - 2].operacion
          : nuevaOperacion;
      
      acientosGuardados.map((element) => {
        if (element.libro_diario === ID) {
          axios
            .post(
              config.APIURL_DESARROLLO + "/librodiario/agregarAciento/" + ID,
              {
                cuenta: element.cuenta,
                monto: element.monto,
                vp: element.variacion_patrimonial,
                operacion: ultimoIDOperacion,
                tipo: element.tipo,
              },
              {
                headers: {
                  autorizacion: token,
                },
              }
            )
            .then((res) => {  })
            .catch((err) => {
              console.log(err.response.data);
            });
        }
      });
      const eliminarSubidosDelLS = acientosGuardados.filter(aciento => aciento.libro_diario !== ID )
      localStorage.setItem('Acientos', JSON.stringify(eliminarSubidosDelLS))
      obtenerAcientos()
      setIsLoading(true);
      setTimeout(()=>{setIsLoading(false)},2000);
      
    } 
  };
  return (
    <div>
      <div className="d-flex align-items-start flex-column">
        <div className="shadow rounded p-3 mb-3">
          <Button variant="dark" className="mb-3">
            Ver balance de comprobacion de sumas y saldos
          </Button>
          <h2>
            Debe: <span className="text-success">{totalDebe()}</span>
          </h2>
          <h2>
            Haber: <span className="text-danger">{totalHaber()}</span>
          </h2>
        </div>
        <div className="vistaMayor">
          <select name="select" key={"select"}>
            <option value="todos" key="todos">
              Todos
            </option>
            {todasLasCuentas.map((cuenta) => (
              <option value={cuenta} key={cuenta}>
                {cuenta}
              </option>
            ))}
          </select>{" "}
          <Button variant="success">Ver Mayor</Button>
        </div>
        <Button variant="danger" className="mt-3 mb-3">
          Ver errores de balance
        </Button>
      </div>

      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          overflowY: "hidden",
        }}
      >
       {isLoading ?   <Spinner animation="border" role="status">
      <span className="visually-hidden">Guardando...</span>
    </Spinner>: <LDTabla datos={datos} id={ID}></LDTabla>} 

        <div className="d-flex justify-content-between">
          <p>
            Trabjando en la operacion: id:{" "}
            {!nuevaOperacion && datos.length > 0
              ? datos[datos.length - 2].operacion
              : nuevaOperacion}
          </p>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              placeholder="Ingrese descripción de la operacion"
              className="p-1 border-0 border-bottom border-primary"
            />
            <Button style={{ marginLeft: "10px" }}>
              Empezar nueva operacion
            </Button>
          </div>
        </div>
          <Button variant="outline-dark" onClick={guardarAcientos}>{isLoading ?<> <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Guardando... </>: <img  width="48"  height="48"     src="https://img.icons8.com/color/48/save--v1.png" alt="save--v1"/> }</Button>

      </div>
    </div>
  );
};

export default LibroDiario;
