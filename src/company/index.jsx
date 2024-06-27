import React, { useEffect, useState } from 'react'
import CompanyStock from './components/companyStock'

import OgongRate from './components/ogongRate';
import { Col, Container, Row } from 'react-bootstrap';
import Matrix from './components/metrics';
import './components/styles/company.css';

export default function Company({ ratios, updateOgongRate }) {
  const indicatorName = ['수익성', '안정성', '성장성', '활동성'];
  const rateColor = ['#ff7300', '#ffc658', '#82ca9d', '#8884d8'];

  return (
    <>
      {
        ratios &&
        <Container fluid style={{ padding: "30px 30px 0px 30px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CompanyStock code={ratios.code} name={ratios.name} price={ratios.price} />
            <OgongRate rate={updateOgongRate} />
          </div>
          <Row>
            <Col xs={12} md={6}>
              <p className='indicator'>{indicatorName[0]} 지표</p>
              <Matrix ratio={ratios.profit} color={rateColor[0]} />
            </Col>
            <Col xs={12} md={6}>
              <p className='indicator'>{indicatorName[1]} 지표</p>
              <Matrix ratio={ratios.growth} color={rateColor[1]} />
            </Col>
            <Col xs={12} md={6}>
              <p className='indicator'>{indicatorName[2]} 지표</p>
              <Matrix ratio={ratios.stability} color={rateColor[2]} />
            </Col>
            <Col xs={12} md={6}>
              <p className='indicator'>{indicatorName[3]} 지표</p>
              <Matrix ratio={ratios.efficiency} color={rateColor[3]} />
            </Col>
          </Row>

        </Container>
      }
    </>
  )
}