import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const data = {
      name: '',
      scopes: []
    };

    axios.post('/oauth/personal-access-tokens', data)
      .then(response => {
        console.log(response.data.accessToken);
      })
      .catch(error => {
        // List errors on error.response...
        console.error(error.response);
      });
    try {
      const response = await axios.post('http://localhost/RECETARIO/Recetario/public/api/register', formData);
      setSuccessMessage('User registered successfully.');
      console.log(response.data); // Manage the response according to your needs
    } catch (error) {
      if (error.response) {
        setError('This user already exists, enter another email');
        // The request was made, but the server responded with a status code that is not in the range of 2xx
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made, but no response was received
        setError('This user already exists, enter another email');
      } else {
        // Something happened in the application configuration that triggered an error
        setError('Error setting up the request.');
      }
    }
  };

  return (
    <div className="register-container">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} className="shadow p-3 mb-5 bg-white rounded">
            <div className="text-center mb-4">
              <h2>Register</h2>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  name="c_password"
                  value={formData.c_password}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleRegister}
                  className="mt-3"
                >
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
