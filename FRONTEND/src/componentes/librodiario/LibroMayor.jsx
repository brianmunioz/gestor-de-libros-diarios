import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { formatearFecha } from "../../helpers/formatearFecha";
import { variacionesPatrimoniales } from "../../helpers/variacionesPatrimoniales";

const LibroMayor = ({ datos, cuenta }) => {
  const datosMayor = datos.filter((aciento) => {
    const acientoCuenta = aciento.cuenta ? aciento.cuenta.toUpperCase() : "sd";
    return acientoCuenta === cuenta;
  });
  let contador = 0;
  return (
    <Table  bordered hover>
      <thead>
        <tr style={{background: '#fdfd96'}}>
          <th>Fecha</th>
          <th>Detalle</th>
          <th>DEBE</th>
          <th>HABER</th>
          <th>Autor</th>
          <th>Operación</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody style={{ overflow: "auto" }}>
        {datosMayor.length > 0 &&
          datosMayor.map((aciento) => {
            const esDebe = variacionesPatrimoniales.debe.some(
              (vp) => aciento.variacion_patrimonial === vp
            );
            if (esDebe) {
              contador += aciento.monto;
            } else {
              contador -= aciento.monto;
            }
            return (
              <tr>
                <td>{formatearFecha(aciento.fecha)}</td>
                <td>{aciento.tipo}</td>

                <td>{esDebe ? aciento.monto : ""}</td>
                <td>{!esDebe ? aciento.monto : ""}</td>

                <td>{aciento.autor}</td>
                <td>{aciento.operacion}</td>
                <td>{contador}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default LibroMayor;
