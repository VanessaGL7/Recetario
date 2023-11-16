import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const PrescriptionsCrud = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPrescriptions = async () => {
        try {
            const response = await axios.get('http://localhost/RECETARIO/Recetario/public/api/prescriptions');
            setPrescriptions(response.data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    const handleModalOpen = () => {
        setShowModal(true);
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PrescriptionsCrud;
