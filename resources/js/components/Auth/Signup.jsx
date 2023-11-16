import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup=()=>{
    const [errors,setErrors]=useState({
        fname:'',
        email:'',
        password:'',
        cpassword:'',
        successMsg:''
    });

    const[user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        c_password:""
    });

    const {name, email, password, c_password} = user;
    const onInputChange = e => {
        setUser({...user,[e.target.name]: e.target.value});
    };

    async function signup(){
        await axios.post("http://localhost/RECETARIO/Recetario/public/api/register",user)
        .then(function(response){
            setErrors({
                //successMsg:response.data.success
            });
        })
        .catch(function (err){
            alert(err.response.data.error.name)
            setErrors({fname:err.response.data.error.name})
        });
    }
    return(
        <Row className='mt-5 justify-content-center'>
      {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title className='fw-bold fs-3'>Resgistrar</Card.Title>
        <Form onSubmit={register}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChangeFormData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name" name="name" value={name} onChange={onChangeFormData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"name="password" value={password} onChange={onChangeFormData} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name="passwordConfirm" value={passwordConfirm} onChange={onChangeFormData}/>
      </Form.Group>
      <Button variant="primary" type="submit">Registrar</Button>
        <div className="text-center">
            <Form.Label className="mt-2">¿Ya tienes una cuenta? <Link to="/DiabeSure/public/"><span className='text-primary' role="button">Inicia sesión</span></Link></Form.Label>
          </div>
    </Form>
      </Card.Body>
    </Card>
  </Row>
    )
}