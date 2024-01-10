import React, { useState } from 'react';
import AppLogoBlack from '../components/AppLogoBlack';
import { Form, Card, Button } from 'react-bootstrap';
import { useBackendContext } from '../context/BackendContext';

function Login() {
  const { api_base } = useBackendContext();
  const [isValidated, setIsValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setIsValidated(true);
      return;
    }

    try {
      // const response = await axios.post(`${api_base}/api/users/login`, {
      //   email: email,
      //   password: password,
      // });

      const response = await fetch(`${api_base}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error, display a message to the user, etc.
    }
  };

  return (
    <div className='d-flex flex-column align-items-center background-white'>
      <div className='p-5'>
        <AppLogoBlack />
      </div>
      <h3 className='text-'>Log in</h3>

      <Card style={{ width: '350px', backgroundColor: '#F6F7F8' }}>
        <Card.Body>
          <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Log in</Button>
          </Form>
        </Card.Body>
      </Card>

      <p className="pt-5">Made by Aditya Raj 😁😎</p>
    </div>
  );
}

export default Login;
