import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const DoctorsCrud = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    doctor_name: '',
    phone: '',
    professional_license: '',
    doctor_address: '',
    institution: '',
  });

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost/Recetario/recetario/public/api/doctors'); // Reemplaza la URL con tu endpoint real
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleModalOpen = () => {
    setFormData({
      doctor_name: '',
      phone: '',
      professional_license: '',
      doctor_address: '',
      institution: '',
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (formData.id) {
        // Update
        await axios.put(`http://localhost/Recetario/recetario/public/api/doctors/update`, formData);
      } else {
        // Create
        await axios.post('http://localhost/Recetario/recetario/public/api/doctors/store', formData);
      }

      handleModalClose();
      fetchDoctors();
    } catch (error) {
      console.error('Error creating/updating doctor:', error);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost/Recetario/recetario/public/api/doctors/destroy`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={handleModalOpen}>
        Add Doctor
      </Button>

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
          {doctors.map((doctor) => (
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
            {/* Add other form fields here... */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdate}>
            {formData.id ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorsCrud;
