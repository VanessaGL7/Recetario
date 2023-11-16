import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const PrescriptionsCrud = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        doctor_name: '',
        indications: '',
        duration: '',
        frecuency: '',
        patient_id: '',
        medicines_id: '',
        tradename: '',
    });
    const [alerts, setAlerts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPrescriptions = async () => {
        try {
            const response = await axios.get('http://localhost/Recetario/recetario/public/api/prescriptions');
            setPrescriptions(response.data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
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
            await axios.post('http://localhost/Recetario/recetario/public/api/prescriptions/store', formData);
            handleModalClose();
            fetchPrescriptions();
            showAlert('success', 'Prescription created successfully.');
        } catch (error) {
            console.error('Error creating prescription:', error);
            showAlert('danger', 'Error creating prescription. Please try again.');
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`http://localhost/Recetario/recetario/public/api/prescriptions/update/${formData.id}`, formData);
            handleModalClose();
            fetchPrescriptions();
            showAlert('success', 'Prescription updated successfully.');
        } catch (error) {
            console.error('Error updating prescription:', error);
            showAlert('danger', 'Error updating prescription. Please try again.');
        }
    };

    const handleEdit = (id) => {
        const selectedPrescription = prescriptions.find((prescription) => prescription.id === id);
        setFormData(selectedPrescription);
        handleModalOpen();
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://localhost/Recetario/recetario/public/api/prescriptions/destroy/${id}`);
            fetchPrescriptions();
            showAlert('success', 'Prescription deleted successfully.');
        } catch (error) {
            console.error('Error deleting prescription:', error);
            showAlert('danger', 'Error deleting prescription. Please try again.');
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    // Filtrar recetas por término de búsqueda
    // ...

    // Filtrar recetas por término de búsqueda y patient_id
    const filteredPrescriptions = prescriptions.filter((prescription) =>
        prescription.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ...


    return (
        <div>
            <Button variant="primary" onClick={handleModalOpen}>
                Add Prescription
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
                        <th>Doctor Name</th>
                        <th>Indications</th>
                        <th>Duration</th>
                        <th>Frecuency</th>
                        <th>Patient ID</th>
                        <th>Medicines ID</th>
                        <th>Tradename</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPrescriptions.map((prescription) => (
                        <tr key={prescription.id}>
                            <td>{prescription.id}</td>
                            <td>{prescription.doctor_name}</td>
                            <td>{prescription.indications}</td>
                            <td>{prescription.duration}</td>
                            <td>{prescription.frecuency}</td>
                            <td>{prescription.patient_id}</td>
                            <td>{prescription.medicines_id}</td>
                            <td>{prescription.tradename}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEdit(prescription.id)}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(prescription.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Edit Prescription' : 'Add Prescription'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDoctorName">
                            <Form.Label>Doctor Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter doctor name"
                                name="doctor_name"
                                value={formData.doctor_name}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formIndications">
                            <Form.Label>Indications</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter indications"
                                name="indications"
                                value={formData.indications}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFrecuency">
                            <Form.Label>Frecuency</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter frecuency"
                                name="frecuency"
                                value={formData.frecuency}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPatientID">
                            <Form.Label>Patient ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter patient ID"
                                name="patient_id"
                                value={formData.patient_id}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMedicinesID">
                            <Form.Label>Medicines ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter medicines ID"
                                name="medicines_id"
                                value={formData.medicines_id}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTradename">
                            <Form.Label>Tradename</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tradename"
                                name="tradename"
                                value={formData.tradename}
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

export default PrescriptionsCrud;
