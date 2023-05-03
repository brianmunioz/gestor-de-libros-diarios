import React from 'react';
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
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
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
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action1">Iniciar sesion</Nav.Link>

                <Nav.Link href="#action2">Registrarse</Nav.Link>
                <NavDropdown
                  title="Mi cuenta"
                  id={`offcanvasNavbarDropdown-expand-false`}
                >
                  <NavDropdown.Item href="#action3">Mis datos</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Mis libros diarios</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Libros diarios en los que trabajo</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Configuracion"
                  id={`offcanvasNavbarDropdown-expand-false`}
                >
                  <NavDropdown.Item href="#action3">Editar datos</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Cambiar contraseña</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Gestionar mis libros diarios</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Buscar</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  </>

  
  );
}

export default Header;