import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CompanyStock from './components/companyStock'
import Metrics from './components/metrics'

import OgongRate from './components/ogongRate';
import { getStockRatios } from './apis/stocks';
import { Col, Container, Row } from 'react-bootstrap';
import './components/styles/company.css'

export default function Company() {
  const [ratios, setRatios] = useState([]);
  const params = useParams();
  const indicatorName = ['수익성', '활동성', '안정성', '성장성'];
  const rateColor = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  useEffect(() => {
    setRatios(getStockRatios(params.code)); // CODE 추가하기 00126380
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col className='title' xs={2}>
            <CompanyStock code={ratios.code} name={ratios.name} price={ratios.price} />
          </Col>
          <Col xs={10}>
            <OgongRate rate={ratios.ogong_rate} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <p>{indicatorName[0]} 지표</p>
            <Metrics ratio={ratios.profit} color={rateColor[0]} />
          </Col>
          <Col xs={12} md={6}>
            <p>{indicatorName[1]} 지표</p>
            <Metrics ratio={ratios.growth} color={rateColor[1]} />
          </Col>
          <Col xs={12} md={6}>
            <p>{indicatorName[2]} 지표</p>
            <Metrics ratio={ratios.stability} color={rateColor[2]} />
          </Col>
          <Col xs={12} md={6}>
            <p>{indicatorName[3]} 지표</p>
            <Metrics ratio={ratios.activity} color={rateColor[3]} />
          </Col>
        </Row>

      </Container>
    </>
  )
}
