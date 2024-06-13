import React from "react";
import Scatter from "../../clustering/components/scatter";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import CustomGraphCompare from "../../custom-graph/pages/compare";
import { Row, Col, Container } from "react-bootstrap";

export default function main() {
  return (
    <>
      <NavbarHeader />
      <Container fluid>
        <Row>
          <Col>
            <CustomGraph />
          </Col>
          <Col>
            <CustomGraphCompare />
          </Col>
        </Row>
      </Container>
    </>
  );
}
