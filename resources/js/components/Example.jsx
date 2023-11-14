import React, { useState, useEffect } from "react";
import Card_C2 from "./Card_C2";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';


//ListCard
function Example() {
  const [userData, setUserData] = useState({})
  
  useEffect(()=>{
    const getUsers = async() => {
      await axios.get('http://localhost/Topicos/ProyectoTop/public/api/user_index')
      .then(function (response) {
        // handle success
        console.log(response);
        setUserData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
        }
        getUsers()
      },[])
  

      if(!userData.length) return
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
      

    return(
      <>
      {userData.map((user)=>(
        <Card_C2 name={user.name} email={user.email}/>
      ))}
    
    </>
  );
}

export default Example;

/*if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <Example/>
        </React.StrictMode>
    )
}*/
