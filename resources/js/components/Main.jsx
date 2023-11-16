import React from "react";
import Example from './Example';
import Login from './Login';
//import React from "react";
import Menu from "./Menu";
import DoctorsCrud from "./DoctorsCrud";
import MenuAdm from "./MenuAdm";
import MenuUser from "./MenuUser";
import MedicinesUsers from "./MedicinesUsers";
import PrescriptionsUsers from "./PrescriptionsUsers";
import MedicinesCrud from "./MedicinesCrud";
import PrescriptionsCrud from "./PrescriptionsCrud";
import PatientsCrud from "./PatientsCrud";
import UserCrud from "./UserCrud";
import MedicinesTypeCrud from "./MedicinesTypeCrud";
import {Routes, Route, Navigate} from 'react-router-dom';
import Register from "./Register";


function Main() {
    return (
      <Routes>
        <Route path="/recetario/recetario/public/" element={<Menu />}>
          <Route index element={<Login />} />
          <Route path="MenuAdm" element={<MenuAdm />}>
            <Route path="DoctorsCrud" element={<DoctorsCrud />} />
            <Route path="MedicinesTypeCrud" element={<MedicinesTypeCrud />} />
            <Route path="PatientsCrud" element={<PatientsCrud />} />
            <Route path="MedicinesCrud" element={<MedicinesCrud />} />
            <Route path="PrescriptionsCrud" element={<PrescriptionsCrud />} />
            <Route path="UserCrud" element={<UserCrud />} />
          </Route>
          <Route path="MenuUser" element={<MenuUser />}>
            <Route path="MedicinesUsers" element={<MedicinesUsers />} />
            <Route path="PrescriptionsUsers" element={<PrescriptionsUsers />} />
          </Route>
          <Route path="Register" element={<Register />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    );
  }
  

export default Main;