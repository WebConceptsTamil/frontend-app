import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      <Row className="mt-5 text-center">
        <Col><h1 className="display-6">Page Not Found</h1></Col>
        <Link  to={"/"}>Home</Link>
      </Row>
    </Container>
  );
}

export default NotFound;
