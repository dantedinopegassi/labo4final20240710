import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Materias from "./components/Materias";
import Aulas from "./components/Aulas";
import Asignaciones from "./components/Asignaciones";
import ConsultaMaterias from "./components/ConsultaMaterias";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Asignación de Aulas</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/materias">Materias</Nav.Link>
            <Nav.Link href="/aulas">Aulas</Nav.Link>
            <Nav.Link href="/asignaciones">Asignaciones</Nav.Link>
            <Nav.Link href="/consulta">Consulta Materias</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/materias" component={Materias} />
          <Route path="/aulas" component={Aulas} />
          <Route path="/asignaciones" component={Asignaciones} />
          <Route path="/consulta" component={ConsultaMaterias} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
