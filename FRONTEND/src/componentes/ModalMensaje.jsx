import React from 'react';
import {  Modal } from "react-bootstrap";


const ModalMensaje = ({mostrar, setMostrar, bgColor = 'light',textColor = 'dark',titulo = '',mensaje='', ocultarBotonCerrar=false}) => {
  return (
    <Modal show={mostrar} onHide={setMostrar} >
      <Modal.Header className={'bg-'+bgColor+' text-'+textColor}>{titulo}</Modal.Header>
        <Modal.Body className={'border-0 bg-'+bgColor+' text-'+textColor}>
{mensaje}    

        </Modal.Body>
        <Modal.Footer className={'border-0 bg-'+bgColor+' text-'+textColor}>
{!ocultarBotonCerrar && bgColor!== 'danger'&&    <button className='btn btn-danger' onClick={setMostrar}> cerrar</button>
}
{!ocultarBotonCerrar && bgColor=== 'danger'&&    <button className='btn btn-outline-light' onClick={setMostrar}> cerrar</button>
}
        </Modal.Footer>
    </Modal>
  )
}

export default ModalMensaje