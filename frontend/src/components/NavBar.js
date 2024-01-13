import React from 'react';
import { Container, Nav, Navbar, Badge, Button } from 'react-bootstrap';
import AppLogo from './AppLogo';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function  NavBar() {
  const { logout, currentUser } = useAuthContext();
  const navigate = useNavigate(); // Create a navigate function

  const logoutHandler = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error in logoutHandler in NavBar', error);
    }
  };

  return (
    <Navbar expand="md" bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home"><AppLogo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#alltasks">All Tasks<Badge pill bg="secondary">19</Badge></Nav.Link>
            <Nav.Link href="#completedtasks">Completed Tasks<Badge pill bg="secondary">10</Badge></Nav.Link>
            <Nav.Link href="#incompletedtasks">Incompleted Tasks<Badge pill bg="secondary">9</Badge></Nav.Link>
          </Nav>
          <Nav className='me-2'>
            <Navbar.Text>
              Signed in as: <a href="#login">{currentUser.email}</a>
              <i style={{ cursor: 'pointer' }} className="bi bi-person-circle ms-2 cursor-pointer"></i>
            </Navbar.Text>
          </Nav>
          <Button variant="danger" onClick={logoutHandler}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar