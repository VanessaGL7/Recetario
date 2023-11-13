import React from "react";
import Card_C2 from "./Card_C2";
import Example from './Example';
import Login from "./Login";
//import React from "react";
import Menu from "./Menu";
import AdminComponent from "./AdminComponet";
import {Routes, Route, Navigate} from 'react-router-dom';


function Main(){
    return(
        <Routes>
        <Route path="/recetario/recetario/public/" element={<Menu/>}>
        <Route path="Login" element={<Login/>}/>
        <Route path="AdminComponent" element={<AdminComponent/>}/>
        <Route path="listcards" element={<Example/>}/>
        <Route path="*" element={<Navigate replace to="/"/>}/>
        </Route>
    </Routes>
    );
}

export default Main;