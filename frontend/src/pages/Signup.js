import React, { useState } from 'react'
import AppLogoBlack from '../components/AppLogoBlack'
import { Form, Card, InputGroup, Button, Col, Row } from 'react-bootstrap'


function Signup() {
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = (event) => {
    console.log('Signup.js handleSubmit was called');
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setIsValidated(true);
  };
  return (
    <div className='d-flex flex-column align-items-center '>
      <div className='p-5'>
        <AppLogoBlack/>
      </div>
      <h3 className='text-'>Sign up</h3>

      <Card style={{ maxWidth: '350px', backgroundColor: '#F6F7F8' }} className='' >
        <Card.Body >

          <Form noValidate validated={isValidated} onSubmit={handleSubmit} >

            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

            </Row>

            <InputGroup hasValidation className="mb-3">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control required type='text' placeholder='username'/>
              <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
            </InputGroup>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control required type='email' placeholder="name@example.com" />
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control required type='password' placeholder="Enter your password" />
              <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" >Sign up</Button>
          </Form>

        </Card.Body>
      </Card>

      <p className="pt-5 ">Made by Aditya Raj 😁😎</p>

    </div >
  )
}

export default Signup