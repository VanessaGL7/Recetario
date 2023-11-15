import React from "react";
import Example from './Example';
import Login from './Login';
//import React from "react";
import Menu from "./Menu";
import DoctorsCrud from "./DoctorsCrud";
import MenuAdm from "./MenuAdm";
import {Routes, Route, Navigate} from 'react-router-dom';


function Main(){
    return(
        <Routes>
        <Route path="/recetario/recetario/public/" element={<Menu/>}>
        <Route path="Login" element={<Login/>}/>
        <Route path="DoctorsCrud" element={<DoctorsCrud/>}/>
        <Route path="MenuAdm" element={<MenuAdm/>}/>
        <Route path="listcards" element={<Example/>}/>
        <Route path="*" element={<Navigate replace to="/"/>}/>
        </Route>
    </Routes>
    );
}

export default Main;