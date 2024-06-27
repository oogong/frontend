import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Company from "../../company/index";
import Comment from "../../comment/components/Comment";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { getStockRatios } from "../../company/apis/stocks";
import LoadingPage from "./loadingPage";
import NavbarHeader from "../../navbar/components/navbar";

export default function Detail() {
  const [ratios, setRatios] = useState(null); // 초기값을 null로 설정하여 로딩 상태를 나타냅니다.
  const params = useParams();

  useEffect(() => {
    if (params.code) {
      getStockRatios(params.code).then((data) => {
        setRatios(data);
      });
    }
  }, [params.code]);

  if (!ratios) {
    return <LoadingPage />;
  }

  return (
    <div style={{ height: "100%" }}>
      <NavbarHeader />
      <Container fluid style={{ padding: "0px" }}>
        <Row style={{ alignItems: "flex-start" }}>
          <Col xs={8} sm={8} style={{ padding: "0px" }}>
            <Company ratios={ratios} />
          </Col>
          <Col xs={4} sm={4} style={{ padding: "0px" }}>
            <Comment roomCode={params.code} roomName={ratios.name} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
