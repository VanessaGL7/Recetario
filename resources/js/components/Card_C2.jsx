import React from "react";
import {Button, Card} from 'react-bootstrap';
import ReactDOM from 'react-dom/client';

function Card_C2 (props){
  const firstname = props.name
  const email= props.email
    return(
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
          <Card.Title>{firstname}</Card.Title>
          <Card.Text> {email} </Card.Text>
      <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Card_C2