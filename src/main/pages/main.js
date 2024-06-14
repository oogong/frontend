import React from "react";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import "./styles/style.css";
import Lineup from "../../weightedgraph/lineup";
import Lineup2 from "../../weightedgraph/lineup2";
import { Row, Col, Container } from "react-bootstrap";
import { WeightProvider } from "../../weightedgraph/weightcontext";

export default function main() {
  return (
    <div className="main-page">
      <NavbarHeader />
      <Container fluid>
        <Row>
          <Col xs={6}>
            <WeightProvider>
              <CustomGraph />
              <Lineup />
            </WeightProvider>
          </Col>
          <Col xs={6}>
            <WeightProvider>
              <CustomGraph />
              <Lineup2></Lineup2>
            </WeightProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
