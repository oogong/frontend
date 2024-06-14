import React from "react";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import CustomGraphCompare from "../../custom-graph/pages/compare";
import Lineup from "../../weightedgraph/lineup";
import Lineup2 from "../../weightedgraph/lineup2";
import { Row, Col, Container } from "react-bootstrap";
import { WeightProvider } from "../../weightedgraph/weightcontext";

export default function main() {
  return (
    <>
      <NavbarHeader />
      <Container fluid>
        <Row>
          <Col>
            <WeightProvider>
              <CustomGraph />
              <Lineup />
            </WeightProvider>
          </Col>
          <Col>
            <WeightProvider>
              <CustomGraph />
              <Lineup2></Lineup2>
            </WeightProvider>
          </Col>
        </Row>
      </Container>
    </>
  );
}
