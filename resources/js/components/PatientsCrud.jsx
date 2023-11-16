import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const PatientsCrud = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    patient_name: '',
    age: '',
    weight: '',
    height: '',
    allergic: '',
    email: '',
  });
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost/Recetario/recetario/public/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
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
      await axios.post('http://localhost/Recetario/recetario/public/api/patients/store', formData);
      handleModalClose();
      fetchPatients();
      showAlert('success', 'Patient created successfully.');
    } catch (error) {
      console.error('Error creating patient:', error);
      showAlert('danger', 'Error creating patient. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost/Recetario/recetario/public/api/patients/update/${formData.id}`, formData);
      handleModalClose();
      fetchPatients();
      showAlert('success', 'Patient updated successfully.');
    } catch (error) {
      console.error('Error updating patient:', error);
      showAlert('danger', 'Error updating patient. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const selectedPatient = patients.find((patient) => patient.id === id);
    setFormData(selectedPatient);
    handleModalOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost/Recetario/recetario/public/api/patients/destroy/${id}`);
      fetchPatients();
      showAlert('success', 'Patient deleted successfully.');
    } catch (error) {
      console.error('Error deleting patient:', error);
      showAlert('danger', 'Error deleting patient. Please try again.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filtrar pacientes por término de búsqueda
  const filteredPatients = patients.filter((patient) =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="primary" onClick={handleModalOpen}>
        Add Patient
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
            <th>Age</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Allergic</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.patient_name}</td>
              <td>{patient.age}</td>
              <td>{patient.weight}</td>
              <td>{patient.height}</td>
              <td>{patient.allergic}</td>
              <td>{patient.email}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(patient.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(patient.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Edit Patient' : 'Add Patient'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPatientName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPatientAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient age"
                name="age"
                value={formData.age}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPatientWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient weight"
                name="weight"
                value={formData.weight}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPatientHeight">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient height"
                name="height"
                value={formData.height}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPatientAllergic">
              <Form.Label>Allergic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient allergic status"
                name="allergic"
                value={formData.allergic}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPatientEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient email"
                name="email"
                value={formData.email}
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

export default PatientsCrud;
