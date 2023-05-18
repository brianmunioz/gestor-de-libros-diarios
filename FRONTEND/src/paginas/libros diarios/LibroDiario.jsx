import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LDTabla from '../../componentes/librodiario/LDTabla'
import { Button } from 'react-bootstrap';
import config from '../../config/config';
import axios from 'axios';
import { todasLasCuentas } from '../../helpers/todasLasCuentas';
import { variacionesPatrimoniales } from '../../helpers/variacionesPatrimoniales';


const LibroDiario = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const token = document.cookie.replace('token=', '');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get(config.APIURL_DESARROLLO + '/librodiario/verAcientos/' + ID, {
      headers: {
        autorizacion: token
      }
    })
      .then(res => {
        const arregloOperaciones = res.data.map((element) => {//1-obtener todas las operaciones
          return element.operacion
        });
        const cantidadOperaciones = new Set(arregloOperaciones);//2-Eliminar elementos repetidos
        const totalOperaciones = [...cantidadOperaciones];//Con un formato mejor...
        let arregloAMostrar = [];//En este arreglo se mostraran los datos en forma ordenada
        for (let i = 0; i < totalOperaciones; i++) {//3-Ordenar los debes y haberes de cada operacion
          //4-Dividimos las cuentas del debe y del haber
          const cuentasDebe = res.data.filter((element) => {
            const esDebe = variacionesPatrimoniales.debe.some(vp => vp === element.variacion_patrimonial);
            return element.operacion === totalOperaciones[i] && esDebe
          })
          const cuentasHaber = res.data.filter((element) => {
            const esHaber = variacionesPatrimoniales.haber.some(vp => vp === element.variacion_patrimonial);
            return element.operacion === totalOperaciones[i] && esHaber

          })
          //5- agregamos los arreglos en nuestro arreglo final
          // y al final de la iteracion se guardaran los arreglos de forma que se ordenen por operacion y primero debe y luego haber de cada operación
          arregloAMostrar.push(...cuentasDebe);
          arregloAMostrar.push(...cuentasHaber);

        }
        setDatos(arregloAMostrar)
      })
      .catch(() => navigate('/') )
  }, [])


  const totalDebe = () => {
    let total = 0;
    datos.filter(element => {
      const esDebe = variacionesPatrimoniales.debe.some(vp => vp === element.variacion_patrimonial);
      if (esDebe) {
        total += element.monto;
        return element
      }
    })
    return total
  }
  console.log(totalDebe())
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">

        <div>
          <Button variant='dark' className='mb-3'>Ver balance de comprobacion de sumas y saldos</Button>
          <h2>Debe: <span className='text-success'>{totalDebe()}</span></h2>
          <h2>Haber: <span className='text-danger'>50.000</span></h2>
        </div>
        <div className="vistaMayor">
          <select name="select">
            <option value='todos'>Todos</option>
            {
              todasLasCuentas.map(cuenta => <option value={cuenta} >{cuenta}</option>
              )
            }
          </select>          <Button variant='success'>Ver Mayor</Button>
        </div>
      </div>


      <div style={{ overflow: 'auto', width: '100%', height: '500px', overflowY: 'hidden' }}>



        <LDTabla datos={datos} id={ID}></LDTabla>

      </div>
    </div>
  )
}

export default LibroDiario