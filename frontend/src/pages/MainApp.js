import React from 'react';
import NavBar from '../components/NavBar';
import Body from '../components/Body';
import { Container } from 'react-bootstrap';

function MainApp() {
  return (
    <div>
      <NavBar />
      <Container>
        <Body />
      </Container>
    </div >
  )
}

export default MainApp