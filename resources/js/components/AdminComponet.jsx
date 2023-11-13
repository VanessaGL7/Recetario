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
      const response = await axios.get('API_ENDPOINT'); // Reemplaza 'API_ENDPOINT' con la ruta de tu API
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Se ejecuta una vez al cargar el componente

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
      // Lógica para guardar o actualizar datos en la base de datos
      // Puedes usar formData para enviar los datos al servidor
      await axios.post('API_ENDPOINT', formData); // Reemplaza 'API_ENDPOINT' con la ruta de tu API
      fetchData(); // Vuelve a cargar los datos después de guardar o actualizar
      handleClose(); // Cierra el modal
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Lógica para eliminar datos de la base de datos
      await axios.delete(`API_ENDPOINT/${id}`); // Reemplaza 'API_ENDPOINT' con la ruta de tu API
      fetchData(); // Vuelve a cargar los datos después de eliminar
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
            {/* Agrega más encabezados según tus datos */}
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {/* Agrega más celdas según tus datos */}
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
            {/* Agrega más campos según tus datos */}
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
