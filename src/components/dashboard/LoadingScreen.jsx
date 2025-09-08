import React from "react";
import { Container, Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <Spinner animation="border" variant="primary" />
      <span className="ms-3">Loading metrics...</span>
    </Container>
  );
};

export default LoadingScreen;