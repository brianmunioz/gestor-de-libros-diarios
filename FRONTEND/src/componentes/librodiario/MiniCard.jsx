import React from 'react'
import { Card, Button } from 'react-bootstrap'

const MiniCard = () => {
  return (
    <Card className='mb-3 border rounded'>
    <Card.Body className='bg-dark rounded'>
      <Card.Title className='text-light'>Special title treatment</Card.Title>        
      <Button variant="outline-light">Ir al libro diario</Button>
    </Card.Body>
  </Card>  )
}

export default MiniCard