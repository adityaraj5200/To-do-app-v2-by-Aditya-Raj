import React, { useState } from 'react';
import AppLogoBlack from '../components/AppLogoBlack';
import { Form, Card, Button } from 'react-bootstrap';
import { useBackendContext } from '../context/BackendContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { api_base } = useBackendContext();
  const { login } = useAuthContext();
  const [isValidated, setIsValidated] = useState(false);
  const [email, setEmail] = useState('adityaraj5200@gmail.com');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate(); // Create a navigate function

  const loginClickHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setIsValidated(true);
      return;
    }

    try {
      const response = await fetch(`${api_base}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();

      // updating the authContext
      await login(JSON.stringify(json));
      navigate('/'); // Navigate to '/' after login

      // console.log(json);
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error, display a message to the user, etc.
    }
  };

  return (
    <div className='d-flex flex-column align-items-center bg-white'>
      <div className='p-5'>
        <AppLogoBlack />
      </div>
      <h3 className='text-'>Log in</h3>

      <Card style={{ width: '350px', backgroundColor: '#F6F7F8' }}>
        <Card.Body>
          <Form noValidate validated={isValidated} onSubmit={loginClickHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoComplete='username'
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
                autoComplete='current-password'
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
