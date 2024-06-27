import React, { useEffect, useState } from "react";
import CompanyStock from "./components/companyStock";

import OgongRate from "./components/ogongRate";
import { Col, Container, Row } from "react-bootstrap";
import Matrix from "./components/metrics";
import "./components/styles/company.css";

export default function Company({ ratios }) {
  const indicatorName = ["수익성", "활동성", "안정성", "성장성"];
  const rateColor = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

  // TODO: 글꼴을 적용합니다.
  return (
    <>
      {ratios && (
        <Container fluid style={{ padding: "30px 30px 0px 30px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CompanyStock
              code={ratios.code}
              name={ratios.name}
              price={ratios.price}
            />
            <OgongRate rate={ratios.ogong_rate} />
          </div>
          <Row className="indicators">
            <Col className="indicator-box" xs={12} md={6}>
              <p className="indicator">{indicatorName[0]} 지표</p>
              <Matrix ratio={ratios.profit} color={rateColor[0]} />
            </Col>
            <Col className="indicator-box" xs={12} md={6}>
              <p className="indicator">{indicatorName[1]} 지표</p>
              <Matrix ratio={ratios.growth} color={rateColor[1]} />
            </Col>
            <Col className="indicator-box" xs={12} md={6}>
              <p className="indicator">{indicatorName[2]} 지표</p>
              <Matrix ratio={ratios.stability} color={rateColor[2]} />
            </Col>
            <Col className="indicator-box" xs={12} md={6}>
              <p className="indicator">{indicatorName[3]} 지표</p>
              <Matrix ratio={ratios.efficiency} color={rateColor[3]} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
