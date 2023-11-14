import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminComponent from './AdminComponet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userRole, setUserRole] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:80/Recetario/recetario/public/api/login', {
        email: email,
        password: password,
      });
  
      // Access token is obtained from the server response
      const token = response.data.token;
      console.log('Access token:', token);

  
      // You can do whatever you want with the token here, such as storing it in your component's state
      setUserRole(response.data.user.role);
  
      setSuccessMessage('Successful login');
      setErrorMessage(''); // Clear the error message if there is a previous one
  
      console.log('Authenticated user:', response.data.user);
  
      // Redirect based on the user role
      if (response.data.user.role === 'admin') {
        // Redirect to the admin page
        window.location.href = './AdminComponet';
      } else {
        // Redirect to the regular user page
       // window.location.href = '/user-page';
      }
    } catch (error) {
      setErrorMessage('Error logging in: ' + error.response.data.error);
      setSuccessMessage(''); // Clear the success message if there is a previous one
      console.error('Error logging in:', error.response.data.error);
    }
  };

  return (
    <div className="login-container"
      style={{
        backgroundImage: 'url("https://media0.giphy.com/media/ccKEsBDAAQTrutQ9LA/giphy.gif?cid=ecf05e47fyxzl2ak0f6maukyce8favh7jj1e0hwtv11x02du&ep=v1_gifs_search&rid=giphy.gif&ct=g")',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
