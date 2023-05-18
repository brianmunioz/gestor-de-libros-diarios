import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../App.css';


function Header() {
  const token = document.cookie.replace('token=', '');
  const [estaLogeado, setEstaLogeado] = useState(false);

  useEffect(() => {
    if (token) setEstaLogeado(true)
  }, [])

  const cerrarSesion = () => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0; path=/;";
    window.location = '/';

  }


  return (

    <>
      <Navbar bg="dark" expand="false" className="shadow navbar-dark mb-3 w-100">
        <Container fluid>
          <Navbar.Brand className='titulo' href="/"><img width="40" height="40" src="https://img.icons8.com/color-glass/48/book.png" alt="book" /> Gestorneitor</Navbar.Brand>
          <Navbar.Toggle className='border-0' aria-controls={`offcanvasNavbar-expand-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                Gestorneitor
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                {!estaLogeado && <>
                  <Nav.Link ><Link to="/login">Iniciar sesion</Link></Nav.Link>

                  <Nav.Link ><Link to="/registro">Registrarse</Link></Nav.Link>
                </>
                }
                {estaLogeado &&
                  <>
                    <NavDropdown
                      title="Mi cuenta"
                      id={`offcanvasNavbarDropdown-expand-false`}
                    >
                      <NavDropdown.Item ><Link to="/misdatos">Mis datos</Link></NavDropdown.Item>
                      <NavDropdown.Item ><Link to="/mislibrosdiarios">Mis libros diarios</Link></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item ><Link to="/librosdiariosenlosquetrabajo">Libros diarios en los que trabajo</Link></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item ><Link to="/cerrarsesion" onClick={cerrarSesion}>Cerrar sesion</Link></NavDropdown.Item>


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
                  </>

                }

              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>


  );
}

export default Header;