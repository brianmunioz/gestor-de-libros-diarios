import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MiniCard = ({ titulo, id }) => {
  return (
    <Card className='mb-3 border rounded'>
      <Card.Body className='bg-dark rounded'>
        <Card.Title className='text-light'>{titulo}</Card.Title>
        <Button variant="secondary" ><Link className='text-white' to={'/librodiario/' + id}>Abrir</Link></Button>
      </Card.Body>
    </Card>)
}

export default MiniCard