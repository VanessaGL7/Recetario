import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from './authSlice';
import MedicinesUsers from './MedicinesUsers';
import PrescriptionsUsers from './PrescriptionsUsers';
import { Link, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import '/resources/css/app.css'; 

const MenuUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Dispatch action to clear token
      dispatch(clearToken());
      // Redirect to the main page and replace the current entry in history
      navigate('/Recetario/recetario/public/', { replace: true, state: { resetScroll: true } });
    };

    return (
        <div className="menu-container">
          <h2>Welcome User</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <nav className="menu-nav">
            <ul>
              <li>
                <Link to="MedicinesUsers">Medicines</Link>
              </li>
              <li>
                <Link to="PrescriptionsUsers">Prescriptions</Link>
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
        <Route path="MedicinesUsers" element={<MedicinesUsers />} />
        <Route path="PrescriptionsUsers" element={<PrescriptionsUsers />} />
      </Routes>
    </div>
  );
};

export default MenuUser;
