import React from 'react';
import NavBar from '../components/NavBar';
import { Container} from 'react-bootstrap';
import Stat from '../components/Stat';

function Profile() {
  return (
    <div>
      <NavBar />
      <Container >

        <Stat question={'Name'} answer={'Aditya Raj'} />
        <Stat question={'Username'} answer={'@adityaraj5200'} />
        <Stat question={'Total Todos ever made'} answer={'184'} />
        <Stat question={'Todos completed'} answer={'112'} />
      </Container>
    </div >
  )
}

export default Profile