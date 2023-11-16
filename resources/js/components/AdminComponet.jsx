import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminComponent = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('API_ENDPOINT'); // Replace 'API_ENDPOINT' with your API path
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Executed once when loading the component

  const handleShow = (item) => {
    setFormData(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setFormData({});
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      // Logic to save or update data in the database
      // You can use formData to send the data to the server
      await axios.post('API_ENDPOINT', formData); // Replace 'API_ENDPOINT' with your API path
      fetchData(); // Reload data after saving or updating
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Logic to delete data from the database
      await axios.delete(`API_ENDPOINT/${id}`); // Replace 'API_ENDPOINT' with your API path
      fetchData(); // Reload data after deleting
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Button variant="info" onClick={() => handleShow(item)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminComponent;
