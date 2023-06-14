import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MiniCard = ({ titulo, id }) => {
  return (
    <Card className='mb-3 border rounded'>
      <Card.Body className='bg-dark rounded'>
        <Card.Title className='text-light'>{titulo}</Card.Title>
        <Link className='btn btn-outline-light' style={{marginRight: '10px'}} to={'/librodiario/' + id}>Abrir</Link>
        <Link className='btn btn-light ' to={'/autorizaciones/' + id}>Autorizaciones</Link>
      </Card.Body>
    </Card>)
}

export default MiniCard