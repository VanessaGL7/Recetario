import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const MedicinesTypeCrud = () => {
  const [medicinesTypes, setMedicinesTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    type_name: '',
    description: '',
  });
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedicinesTypes = async () => {
    try {
      const response = await axios.get('http://localhost/Recetario/recetario/public/api/medicine-types');
      setMedicinesTypes(response.data);
    } catch (error) {
      console.error('Error fetching medicines types:', error);
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
      await axios.post('http://localhost/Recetario/recetario/public/api/medicine-types/store', formData);
      handleModalClose();
      fetchMedicinesTypes();
      showAlert('success', 'Medicine type created successfully.');
    } catch (error) {
      console.error('Error creating medicine type:', error);
      showAlert('danger', 'Error creating medicine type. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost/Recetario/recetario/public/api/medicine-types/update/${formData.id}`, formData);
      handleModalClose();
      fetchMedicinesTypes();
      showAlert('success', 'Medicine type updated successfully.');
    } catch (error) {
      console.error('Error updating medicine type:', error);
      showAlert('danger', 'Error updating medicine type. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const selectedMedicineType = medicinesTypes.find((medicineType) => medicineType.id === id);
    setFormData(selectedMedicineType);
    handleModalOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost/Recetario/recetario/public/api/medicine-types/destroy/${id}`);
      fetchMedicinesTypes();
      showAlert('success', 'Medicine type deleted successfully.');
    } catch (error) {
      console.error('Error deleting medicine type:', error);
      showAlert('danger', 'Error deleting medicine type. Please try again.');
    }
  };

  useEffect(() => {
    fetchMedicinesTypes();
  }, []);

  // Filtrar tipos de medicinas por término de búsqueda
  const filteredMedicinesTypes = medicinesTypes.filter((medicineType) =>
    medicineType.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="primary" onClick={handleModalOpen}>
        Add Medicine Type
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
            <th>Type Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicinesTypes.map((medicineType) => (
            <tr key={medicineType.id}>
              <td>{medicineType.id}</td>
              <td>{medicineType.type_name}</td>
              <td>{medicineType.description}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(medicineType.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(medicineType.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Edit Medicine Type' : 'Add Medicine Type'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMedicineTypeName">
              <Form.Label>Type Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine type name"
                name="type_name"
                value={formData.type_name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formMedicineTypeDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine type description"
                name="description"
                value={formData.description}
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

export default MedicinesTypeCrud;
