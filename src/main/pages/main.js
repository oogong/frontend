import React from "react";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import "./styles/style.css";
import Lineup from "../../weightedgraph/lineup";
import { Row, Col, Container } from "react-bootstrap";
import { WeightProvider } from "../../weightedgraph/weightcontext";
import Scatter from "../../clustering/components/scatter";
import { SortedDataProvider } from "../../weightedgraph/sorteddatacontext";
import { PlotProvider } from "../../clustering/hooks/PlotProvider";
import Parallel from "../../clustering/components/parallel";
import Downbar from "../../weightedgraph/downbar";

export default function main() {
  const initialSliderValues = [30, 25, 15, 20, 10];

  return (
    <div className="main-page">
      <NavbarHeader />
      <Container fluid>
        <Row className="align-items-start">
          <SortedDataProvider>
            <WeightProvider initialSliderValues={initialSliderValues}>
              <Col xs={6} style={{ borderRight: "1px solid rgba(0,0,0,0.1) " }}>
                <CustomGraph
                  uniqueId="compare1"
                  title="순위"
                  visibleCluster={false}
                />
                <Downbar />
                <Lineup />
              </Col>
              <Col xs={6}>
                <PlotProvider>
                  <div className="plot-card1">
                    <Scatter width="100%" height="40vh" />
                  </div>
                  <div className="plot-card2">
                    <Parallel height="45vh" />
                  </div>
                </PlotProvider>
              </Col>
            </WeightProvider>
          </SortedDataProvider>
        </Row>
      </Container>
    </div>
  );
}
