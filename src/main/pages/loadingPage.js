import { Col, Container, Row, Spinner } from "react-bootstrap";
export default function LoadingPage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Spinner animation="border" />
          <p>Loading...</p>
        </Col>
      </Row>
    </Container>
  );
}
