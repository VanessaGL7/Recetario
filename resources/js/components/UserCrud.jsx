import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    role: '',
    image: '',
  });
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/RECETARIO/Recetario/public/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setAlerts([]);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlert = (variant, message) => {
    const newAlert = { id: Date.now(), variant, message };
    setAlerts([...alerts, newAlert]);

    // Auto-dismiss alert after 5 seconds
    setTimeout(() => {
      setAlerts(alerts.filter((alert) => alert.id !== newAlert.id));
    }, 5000);
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost/RECETARIO/Recetario/public/api/users/store', formData);
      handleModalClose();
      fetchUsers();
      showAlert('success', 'User created successfully.');
    } catch (error) {
      console.error('Error creating user:', error);
      showAlert('danger', 'Error creating user. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost/RECETARIO/Recetario/public/api/users/update/${formData.id}`, formData);
      handleModalClose();
      fetchUsers();
      showAlert('success', 'User updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
      showAlert('danger', 'Error updating user. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    setFormData(selectedUser);
    handleModalOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost/RECETARIO/Recetario/public/api/users/destroy/${id}`);
      fetchUsers();
      showAlert('success', 'User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      showAlert('danger', 'Error deleting user. Please try again.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="primary" onClick={handleModalOpen}>
        Add User
      </Button>

      <Form className="mt-3">
        <Form.Group controlId="formSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>{user.image}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(user.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formUserPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter user password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formUserRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user role"
                name="role"
                value={formData.role}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formUserImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user image URL"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={formData.id ? handleUpdate : handleCreate}>
              {formData.id ? 'Update' : 'Create'}
            </Button>
          </Modal.Footer>
        </Modal>
  
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={alert.variant}>
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  };
  
  export default UserCrud;
  