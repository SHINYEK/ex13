import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ColorContext } from './ColorContext';
import { Button } from 'react-bootstrap';

const FooterPage = () => {
    const {color, setColor} = useContext(ColorContext);

  return (
    <div>
        <Navbar bg={color} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Button onClick={()=>setColor('dark')} variant='danger'>Dark</Button> &nbsp;
        <Button onClick={()=>setColor('primary')} variant='danger'>Primary</Button>
        </Container>
      </Navbar>

    </div>
  )
}

export default FooterPage