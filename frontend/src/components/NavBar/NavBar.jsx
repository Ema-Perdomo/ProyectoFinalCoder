import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/Logo_Barbell.svg';
import { Link } from 'react-router-dom';


function NavBar({ role }) {


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" >
            <Navbar.Brand >
              <img className='w-25' src={logo} alt="Logo" />
            </Navbar.Brand>
          </Link>

          <Nav className="me-auto">

            <Link to="/" className='text-decoration-none m-3 text-light '>Home</Link>
            <Link to="/categoria/Gimnasio" className='text-decoration-none m-3 text-light '>Gimnasio</Link>
            <Link to="/categoria/Deportes" className='text-decoration-none m-3 text-light '>Deportes</Link>
            <Link to="/categoria/Indumentaria" className='text-decoration-none m-3 text-light '>Indumentaria</Link>
            <Link to="/categoria/Suplementos" className='text-decoration-none m-3 text-light '>Suplementos</Link>
            {/* <Link to="/categoria/Outdoor" className='text-decoration-none m-3 text-light '>Outdoor</Link> */}
            {role === 'Admin' ?
              <Link to="/CrearProducto" className='text-decoration-none m-3 text-light '>Añadir producto</Link>
              : null}
            {/* Añadir producto es solo para el admin */}

          </Nav>
          <Link to="/cart" className='text-decoration-none m-3 text-light' > <CartWidget /> </Link>

        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;