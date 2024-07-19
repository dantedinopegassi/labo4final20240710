import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SchedulerComponent from './components/Scheduler';
import Carreras from './components/Carreras';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Classroom Scheduler</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <SchedulerComponent />
        </Col>
        <Col md={4}>
          <Carreras />
        </Col>
      </Row>
    </Container>
  );
}

export default App;