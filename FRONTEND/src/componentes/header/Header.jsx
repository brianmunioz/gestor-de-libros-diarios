import React from 'react';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
  return (
 
    <>
      <Navbar  bg="light" expand="false" className="mb-3 w-100">
        <Container fluid>
          <Navbar.Brand href="/"><img src='../../public/LDLogo.png' height={'40px'}></img> Gestor de Libros Diarios</Navbar.Brand>
          <Navbar.Toggle className='border-0' aria-controls={`offcanvasNavbar-expand-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                Gestor de Libros diarios
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                <Nav.Link ><Link to="/login">Iniciar sesion</Link></Nav.Link>

                <Nav.Link ><Link to="/registro">Registrarse</Link></Nav.Link>
                <NavDropdown
                  title="Mi cuenta"
                  id={`offcanvasNavbarDropdown-expand-false`}
                >
                  <NavDropdown.Item ><Link to="/misdatos">Mis datos</Link></NavDropdown.Item>
                  <NavDropdown.Item ><Link to="/mislibrosdiarios">Mis libros diarios</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item ><Link to="/librosdiariosenlosquetrabajo">Libros diarios en los que trabajo</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item ><Link to="/cerrarsesion">Cerrar sesion</Link></NavDropdown.Item>


                </NavDropdown>
                <NavDropdown
                  title="Configuracion"
                  id={`offcanvasNavbarDropdown-expand-false`}
                >
                  <NavDropdown.Item ><Link to="/editarmisdatos">Editar mis datos</Link></NavDropdown.Item>
                  <NavDropdown.Item ><Link to="/cambiarpassword">Cambiar contraseña</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item ><Link to="/gestionarlibrosdiarios">Gestionar mis libros diarios</Link></NavDropdown.Item>
                </NavDropdown>
              </Nav>
           
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  </>

  
  );
}

export default Header;