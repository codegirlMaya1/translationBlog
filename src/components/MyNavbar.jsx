import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand href="#">My Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
