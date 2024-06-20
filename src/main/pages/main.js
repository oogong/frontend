import React from "react";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import "./styles/style.css";
import Lineup from "../../weightedgraph/lineup";
import { Row, Col, Container } from "react-bootstrap";
import { WeightProvider } from "../../weightedgraph/weightcontext";
import Scatter from "../../clustering/components/scatter";

export default function main() {
  const initialSliderValues = [30, 25, 15, 20, 10];

  return (
    <div className="main-page">
      <NavbarHeader />
      <Container fluid>
        <Row className="align-items-start">
          <WeightProvider initialSliderValues={initialSliderValues}>
            <Col xs={6} style={{borderRight:"1px solid rgba(0,0,0,0.1) "}}>
              <CustomGraph uniqueId="compare1" title="순위" visibleCluster={false} />
              <Lineup />
            </Col>
            <Col xs={6}>
              <Scatter width="100%" height="50vh"/>
            </Col>
          </WeightProvider>
        </Row>
      </Container>
    </div>
  );
}
