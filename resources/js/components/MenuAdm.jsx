import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from './authSlice';
import { Link, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import DoctorsCrud from './DoctorsCrud';
import MedicinesTypeCrud from './MedicinesTypeCrud';
import PatientsCrud from './PatientsCrud';
import PrescriptionsCrud from './PrescriptionsCrud';
import MedicinesCrud from './MedicinesCrud';
import UserCrud from './UserCrud';
import '/resources/css/app.css'; 

const MenuAdm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Dispatch de la acción para borrar el token
      dispatch(clearToken());
      // Redirige a la página principal y reemplaza la entrada actual en el historial
      navigate('/RECETARIO/Recetario/public/', { replace: true, state: { resetScroll: true } });
    };

    return (
        <div className="menu-container">
          <h2>Administrador</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <nav className="menu-nav">
            <ul>
              <li>
                <Link to="DoctorsCrud">Doctors Crud</Link>
              </li>
              <li>
                <Link to="MedicinesTypeCrud">Medicines Type Crud</Link>
              </li>
              <li>
                <Link to="PatientsCrud">Patients Crud</Link>
              </li>
              <li>
                <Link to="MedicinesCrud">Medicines Crud</Link>
              </li>
              <li>
                <Link to="PrescriptionsCrud">Prescriptions Crud</Link>
              </li>
              <li>
                <Link to="UserCrud">User Crud</Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Outlet />
        </div>
      );
};

const MainComponent = () => {
  return (
    <div className="main-container">
      <h1>Main Component</h1>
      <Routes>
        <Route path="/" element={<h2>Bienvenido al componente principal</h2>} />
        <Route path="DoctorsCrud" element={<DoctorsCrud />} />
        <Route path="MedicinesTypeCrud" element={<MedicinesTypeCrud />} />
        <Route path="PatientsCrud" element={<PatientsCrud />} />
        <Route path="MedicinesCrud" element={<MedicinesCrud />} />
        <Route path="PrescriptionsCrud" element={<PrescriptionsCrud />} />
        <Route path="UserCrud" element={<UserCrud />} />
      </Routes>
    </div>
  );
};

export default MenuAdm;
