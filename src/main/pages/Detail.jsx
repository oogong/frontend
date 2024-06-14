import React, { useEffect, useState } from 'react'
import Company from "../../company/index";
import Comment from "../../comment/components/Comment";
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from "react-bootstrap";
import { getStockRatios } from "../../company/apis/stocks";

export default function Detail() {
  const params = useParams();
  const [ratios, setRatios] = useState([]);

  useEffect(() => {
    getStockRatios(params.code).then((data) => {
      setRatios(data); // 삼성전자 CODE 00126380
    });
  }, [])


  return (
    <Container fluid>
      {ratios && 
      <Row>
        <Col xs={8} sm={8}>
          <Company ratios={ratios} />
        </Col>
        <Col xs={4} sm={4}>
          <Comment roomCode={params.code} roomName={ratios.name} /> 
        </Col>
      </Row>
      }
    </Container>);
}