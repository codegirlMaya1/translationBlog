import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const MyNavbar = ({ setSearchTerm, setLanguage }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    i18next.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('My Blog App')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('Home')}</Nav.Link>
            <Nav.Link as={Link} to="/create">{t('Create Blog')}</Nav.Link>
            <Nav.Link as={Link} to="/blogs">{t('Blogs')}</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder={t('Search blogs by title')}
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={handleSearchChange}
              style={{ backgroundColor: 'white' }}
            />
          </Form>
          <Form.Select onChange={handleLanguageChange} style={{ backgroundColor: 'white', marginLeft: '10px' }}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </Form.Select>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;