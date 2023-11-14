import React from "react";
import Example from './Example';
import Login from './LoginScreen';
//import React from "react";
import Menu from "./Menu";
import AdminComponent from "./AdminComponet";
import {Routes, Route, Navigate} from 'react-router-dom';


function Main(){
    return(
        <Routes>
        <Route path="/recetario/recetario/public/" element={<Menu/>}>
        <Route path="LoginScreen" element={<Login/>}/>
        <Route path="AdminComponent" element={<AdminComponent/>}/>
        <Route path="listcards" element={<Example/>}/>
        <Route path="*" element={<Navigate replace to="/"/>}/>
        </Route>
    </Routes>
    );
}

export default Main;