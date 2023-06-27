import React from "react";

import Carrusel from "../componentes/carrusel/Carrusel";
import { Accordion } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <h1 className="text-primary bold">Guía de uso</h1>
      <h2>¿Cómo creo un nuevo libro diario?</h2>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Paso 1</Accordion.Header>
          <Accordion.Body>
            Ingresa a tu cuenta y accede a{" "}
            <span className="text-secondary">
              menú &gt; mi cuenta &gt; mis libros diarios{" "}
            </span>
            <br></br>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Paso 2</Accordion.Header>
          <Accordion.Body>
            Una vez en{" "}
            <span className="text-secondary"> mis libros diario </span> le das
            click al boton{" "}
            <span className="text-secondary">
              {" "}
              Agregar nuevo libros diario{" "}
            </span>{" "}
            completas el campo y si escribiste bien el nombre del libro diario
            te aparecerá un cartel verde.
            <img
              src="/img/paso-1-crear-libro-diario.webp"
              className="w-100 border shadow rounded"
              alt=""
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h2 className="mt-3">
        ¿Cómo creo una nueva operación con acientos contables?
      </h2>
      <Accordion defaultActiveKey="2">
        <Accordion.Item eventKey="2">
          <Accordion.Header>Paso 1</Accordion.Header>
          <Accordion.Body>
            Ingresa a tu cuenta y accede a{" "}
            <span className="text-secondary">
              menú &gt; mi cuenta &gt; Libros diarios en los que trabajo{" "}
            </span>
            <br></br>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Paso 2</Accordion.Header>
          <Accordion.Body>
            Insertar nombre de la operación y darle click en{" "}
            <span className="text-secondary">Agregar operación</span>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Paso 3</Accordion.Header>
          <Accordion.Body>
            Agregar acientos
            <img
              src="/img/paso-3-crear-operacion-y-acientos.webp"
              className="w-100 border shadow rounded"
              alt=""
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Paso 4</Accordion.Header>
          <Accordion.Body>
            Hacer click en el boton{" "}
            <span className="text-secondary">Finalizar operación</span>y si
            tenés los acientos mal balanceados te lo dirá al finalizar operación
            sino se guardaran.
            <img
              src="/img/paso-4-guardar-operacion-y-acientos.webp"
              className="w-100 border shadow rounded"
              alt=""
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
      );
};

export default Home;
