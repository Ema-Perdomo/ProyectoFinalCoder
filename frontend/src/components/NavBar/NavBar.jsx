import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/Logo_Barbell.svg';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/" className='navbar-brand' >
            <img className='navBarLogo img-responsive' src={logo} alt="Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">

            <Link to="/" className='Pestaña'>Home</Link>
            <Link to="/categoria/Gym" className='Pestaña'>Gym</Link>
            <Link to="/categoria/Deportes" className='Pestaña'>Deportes</Link>
            <Link to="/categoria/Indumentaria" className='Pestaña'>Indumentaria</Link>
            <Link to="/categoria/Suplementos" className='Pestaña'>Suplementos</Link>
            
          </Nav>
          <Link to="/cart" className="NavBarItems" > <CartWidget /> </Link>
          
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;