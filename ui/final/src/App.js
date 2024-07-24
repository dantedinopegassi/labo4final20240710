import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Materias from './components/Materias';
import Aulas from './components/Aulas';
import Carreras from './components/Carreras';
import Asignaciones from './components/Asignaciones';
import ConsultaMaterias from './components/ConsultaMaterias';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/materias">Materias</Nav.Link>
            <Nav.Link href="/aulas">Aulas</Nav.Link>
            <Nav.Link href="/carreras">Carreras</Nav.Link>
            <Nav.Link href="/asignaciones">Asignaciones</Nav.Link>
            <Nav.Link href="/consulta">Consulta Materias</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/asignaciones" element={<Asignaciones />} />
          <Route path="/consulta" element={<ConsultaMaterias />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
