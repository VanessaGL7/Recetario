import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const DoctorsCrud = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    doctor_name: '',
    phone: '',
    professional_license: '',
    doctor_address: '',
    institution: '',
  });
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost/Recetario/recetario/public/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
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
      await axios.post('http://localhost/Recetario/recetario/public/api/doctors/store', formData);
      handleModalClose();
      fetchDoctors();
      showAlert('success', 'Doctor created successfully.');
    } catch (error) {
      console.error('Error creating doctor:', error);
      showAlert('danger', 'Error creating doctor. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost/Recetario/recetario/public/api/doctors/update/${formData.id}`, formData);
      handleModalClose();
      fetchDoctors();
      showAlert('success', 'Doctor updated successfully.');
    } catch (error) {
      console.error('Error updating doctor:', error);
      showAlert('danger', 'Error updating doctor. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const selectedDoctor = doctors.find((doctor) => doctor.id === id);
    setFormData(selectedDoctor);
    handleModalOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost/Recetario/recetario/public/api/doctors/destroy/${id}`);
      fetchDoctors();
      showAlert('success', 'Doctor deleted successfully.');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      showAlert('danger', 'Error deleting doctor. Please try again.');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filtrar doctores por término de búsqueda
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="primary" onClick={handleModalOpen}>
        Add Doctor
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
            <th>Phone</th>
            <th>Professional License</th>
            <th>Doctor Address</th>
            <th>Institution</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.doctor_name}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.professional_license}</td>
              <td>{doctor.doctor_address}</td>
              <td>{doctor.institution}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(doctor.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(doctor.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Edit Doctor' : 'Add Doctor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDoctorName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor name"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorProfessional_license">
              <Form.Label>Professional_license</Form.Label>
              <Form.Control
                type="text"
                placeholder="professional_license"
                name="professional_license"
                value={formData.professional_license}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctordoctor_address">
              <Form.Label>Doctor_address</Form.Label>
              <Form.Control
                type="text"
                placeholder="doctor_address"
                name="doctor_address"
                value={formData.doctor_address}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorinstitution">
              <Form.Label>Institution</Form.Label>
              <Form.Control
                type="text"
                placeholder="institution"
                name="institution"
                value={formData.institution}
                onChange={handleFormChange}
              />
            </Form.Group>
            {/* Add other form fields here... */}
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

export default DoctorsCrud;
