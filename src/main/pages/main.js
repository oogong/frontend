import React from "react";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import CustomGraphCompare from "../../custom-graph/pages/compare";
import "./styles/style.css";
import Lineup from "../../weightedgraph/lineup";
import Lineup2 from "../../weightedgraph/lineup2";
import { Row, Col, Container } from "react-bootstrap";
import { WeightProvider } from "../../weightedgraph/weightcontext";
import { WeightProviderCompare } from "../../weightedgraph/weightcontext2";

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
            <WeightProviderCompare>
              <CustomGraphCompare />
              <Lineup2 />
            </WeightProviderCompare>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
