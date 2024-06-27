import React from "react";
import NavbarHeader from "../../navbar/components/navbar";
import CustomGraph from "../../custom-graph/pages/main";
import "./styles/style.css";
import Lineup from "../../weightedgraph/lineup";
import Lineup2 from "../../weightedgraph/lineup2";
import { Row, Col, Container } from "react-bootstrap";
import { WeightProvider } from "../../weightedgraph/weightcontext";
import { SortedDataProvider } from "../../weightedgraph/sorteddatacontext";
import Downbar from "../../weightedgraph/downbar";
import "./compare.css";

export default function Compare() {
  const initialSliderValues = [30, 25, 15, 20, 10];
  const initialSliderValues2 = [20, 20, 20, 20, 20];

  return (
    <div className="main-page">
      <NavbarHeader />
      <Container fluid>
        <Row>
          <SortedDataProvider>
            <Col xs={6}>
              <WeightProvider initialSliderValues={initialSliderValues}>
                <div className="top">
                  <CustomGraph
                    uniqueId="compare1"
                    title="순위"
                    visibleCluster={true}
                  />
                  <Downbar></Downbar>
                </div>
                <Lineup />
              </WeightProvider>
            </Col>
            <Col xs={6}>
              <WeightProvider initialSliderValues={initialSliderValues2}>
                <div className="top">
                  <CustomGraph
                    uniqueId="compare2"
                    title="비교순위"
                    visibleCluster={true}
                  />
                  <Downbar></Downbar>
                </div>
                <Lineup2 />
              </WeightProvider>
            </Col>
          </SortedDataProvider>
        </Row>
      </Container>
    </div>
  );
}
