import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

const MedicinesUsers = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost/Recetario/recetario/public/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Filtrar medicamentos por término de búsqueda
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.tradename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
            <th>Tradename</th>
            <th>Active Ingredient</th>
            <th>Presentation</th>
            <th>Dose</th>
            <th>Original Amount</th>
            <th>Current Amount</th>
            <th>Route of Administration</th>
            <th>Expiration</th>
            <th>Medicine Type</th>
            <th>Medicine Imge</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.id}</td>
              <td>{medicine.tradename}</td>
              <td>{medicine.active_ingredient}</td>
              <td>{medicine.presentation}</td>
              <td>{medicine.dose}</td>
              <td>{medicine.original_amount}</td>
              <td>{medicine.current_amount}</td>
              <td>{medicine.route_of_administration}</td>
              <td>{medicine.expiration}</td>
              <td>{medicine.id_medicine_type}</td>
              <td  style={{ width: '100px' }} ><img src={medicine.image} alt="Medicine" style={{ width: '100%', height: 'auto' }} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MedicinesUsers;
