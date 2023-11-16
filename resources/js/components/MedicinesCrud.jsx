import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const MedicinesCrud = () => {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    tradename: '',
    active_ingredient: '',
    presentation: '',
    dose: '',
    original_amount: '',
    current_amount: '',
    route_of_administration: '',
    expiration: '',
    id_medicine_type: '',
    image: '',
  });
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost/RECETARIO/Recetario/public/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
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
      await axios.post('http://localhost/RECETARIO/Recetario/public/api/medicines/store', formData);
      handleModalClose();
      fetchMedicines();
      showAlert('success', 'Medicine created successfully.');
    } catch (error) {
      console.error('Error creating medicine:', error);
      showAlert('danger', 'Error creating medicine. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost/RECETARIO/Recetario/public/api/medicines/update/${formData.id}`, formData);
      handleModalClose();
      fetchMedicines();
      showAlert('success', 'Medicine updated successfully.');
    } catch (error) {
      console.error('Error updating medicine:', error);
      showAlert('danger', 'Error updating medicine. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const selectedMedicine = medicines.find((medicine) => medicine.id === id);
    setFormData(selectedMedicine);
    handleModalOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost/RECETARIO/Recetario/public/api/medicines/destroy/${id}`);
      fetchMedicines();
      showAlert('success', 'Medicine deleted successfully.');
    } catch (error) {
      console.error('Error deleting medicine:', error);
      showAlert('danger', 'Error deleting medicine. Please try again.');
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Filter medications by search term
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.tradename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="primary" onClick={handleModalOpen}>
        Add Medicine
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
            <th>Tradename</th>
            <th>Active Ingredient</th>
            <th>Presentation</th>
            <th>Dose</th>
            <th>Original Amount</th>
            <th>Current Amount</th>
            <th>Route of Administration</th>
            <th>Expiration</th>
            <th>Medicine Type</th>
            <th>Medicine Image</th>
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
              <td>
                <Button variant="info" onClick={() => handleEdit(medicine.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(medicine.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Edit Medicine' : 'Add Medicine'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            <Form.Group controlId="formActiveIngredient">
              <Form.Label>Active Ingredient</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter active ingredient"
                name="active_ingredient"
                value={formData.active_ingredient}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPresentation">
              <Form.Label>Presentation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter presentation"
                name="presentation"
                value={formData.presentation}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDose">
              <Form.Label>Dose</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter dose"
                name="dose"
                value={formData.dose}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formOriginalAmount">
              <Form.Label>Original Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter original amount"
                name="original_amount"
                value={formData.original_amount}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCurrentAmount">
              <Form.Label>Current Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter current amount"
                name="current_amount"
                value={formData.current_amount}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formRouteOfAdministration">
              <Form.Label>Route of Administration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter route of administration"
                name="route_of_administration"
                value={formData.route_of_administration}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formExpiration">
              <Form.Label>Expiration</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter expiration"
                name="expiration"
                value={formData.expiration}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formMedicineType">
              <Form.Label>Medicine Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine type"
                name="id_medicine_type"
                value={formData.id_medicine_type}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formMedicineImage">
              <Form.Label>Medicine URL Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medicine URL Image"
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

export default MedicinesCrud;
