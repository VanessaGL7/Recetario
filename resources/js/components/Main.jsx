import React from "react";
import Card_C2 from "./Card_C2";
import Example from './Example';
//import React from "react";
import Menu from "./Menu";
import {Routes, Route, Navigate} from 'react-router-dom';


function Main(){
    return(
        <Routes>
        <Route path="/Topicos/ProyectoTop/public/" element={<Menu/>}>
        <Route path="card" element={<Card_C2/>}/>
        <Route path="listcards" element={<Example/>}/>
        <Route path="*" element={<Navigate replace to="/"/>}/>
        </Route>
    </Routes>
    );
}

export default Main;