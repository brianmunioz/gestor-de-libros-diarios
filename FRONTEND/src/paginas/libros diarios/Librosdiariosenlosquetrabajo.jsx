import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import MiniCard from "../../componentes/librodiario/MiniCard";

const Librosdiariosenlosquetrabajo = () => {
  const token = document.cookie.replace("token=", "");
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios.get(config.APIURL_DESARROLLO + "autorizacion/librosenlosquetrabajo", {
        headers: {
            autorizacion: token,
        },
      })
      .then((res) => {
        setDatos(res.data)
      }).catch(()=>{setError(true)});
  }, []);
  

  return <div>
    {datos && !error && datos.map(libro => <MiniCard titulo={libro.nombre} id={libro.libro_diario} mostrarAutorizacion={false}></MiniCard>)}
    {error && <h2>No se pudo acceder a los libros, por favor intente más tarde!</h2>}
  </div>;
};

export default Librosdiariosenlosquetrabajo;
