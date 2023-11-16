import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from './authSlice';
import MenuAdm from './MenuAdm';
import MenuUser from './MenuUser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add this line
  const [successMessage, setSuccessMessage] = useState(''); // Add this line
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:80/RECETARIO/Recetario/public/api/login', {
        email: email,
        password: password,
      });

      const newToken = response.data.data.token;
      dispatch(setToken(newToken));
      setSuccessMessage('Successful login'); // Update success message

      // Redirige al usuario después del inicio de sesión
      if (email === 'admin@gmail.com') {
        if (newToken) {
          console.log('ADMIN');
          navigate('/RECETARIO/Recetario/public/MenuAdm'); // Ruta para la página de administrador
        }
      } else {
        if (newToken) {
          console.log('USER');
          navigate('/RECETARIO/Recetario/public/MenuUser'); // Ruta para la página de administrador
          //navigate('/user'); // Ruta para la página de usuario
        }
      }
    } catch (error) {
      setErrorMessage('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container"
      >
      <Container className="mt-5" >
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} className="shadow p-3 mb-5 bg-white rounded">
            <div className="text-center mb-4">
              <h2>Login</h2>
            </div>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleLogin}
                  className="mt-3"
                >
                  Log In
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
