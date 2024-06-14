import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CompanyStock from './components/companyStock'

import OgongRate from './components/ogongRate';
import { getStockRatios } from './apis/stocks';
import { Col, Container, Row } from 'react-bootstrap';
import './components/styles/company.css'
import Matrix from './components/metrics';

export default function Company() {
  const [ratios, setRatios] = useState([]);
  const params = useParams();
  const indicatorName = ['수익성', '활동성', '안정성', '성장성'];
  const rateColor = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  useEffect(() => {
    getStockRatios(params.code).then((data) => {
      setRatios(data); // 삼성전자 CODE 00126380
    });
  }, [])

  return (
    <>
    {
      ratios &&
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
              <Matrix ratio={ratios.profit} color={rateColor[0]} />
            </Col>
            <Col xs={12} md={6}>
              <p>{indicatorName[1]} 지표</p>
              <Matrix ratio={ratios.growth} color={rateColor[1]} />
            </Col>
            <Col xs={12} md={6}>
              <p>{indicatorName[2]} 지표</p>
              <Matrix ratio={ratios.stability} color={rateColor[2]} />
            </Col>
            <Col xs={12} md={6}>
              <p>{indicatorName[3]} 지표</p>
              <Matrix ratio={ratios.efficiency} color={rateColor[3]} />
            </Col>
          </Row>

        </Container>
      }
    </>
  )
}