import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Laboratorio 4</Card.Title>
              <Card.Text>
                <strong>Integrantes:</strong>
                <ul>
                  <li>Nico Bostero</li>
                  <li>Gero Gabas</li>
                </ul>
                <strong>Profesor:</strong> Facundo Fumaneri
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
