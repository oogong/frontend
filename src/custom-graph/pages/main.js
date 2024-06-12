import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./main.css";

function CustomGraph() {
  const [sections, setSections] = useState([
    { name: "수익성", color: "#FF7676", percentage: 30 },
    { name: "안정성", color: "#FFDD87", percentage: 10 },
    { name: "활동성", color: "#91D600", percentage: 30 },
    { name: "생산성", color: "#87D4FF", percentage: 25 },
    { name: "오공 지수", color: "#C376FF", percentage: 5 },
  ]);

  const graphContainerRef = useRef(null);

  const handleMouseMove = (event, index) => {
    event.preventDefault();
    if (!graphContainerRef.current) {
      return;
    }
    const totalWidth = graphContainerRef.current.offsetWidth;
    const deltaX =
      event.clientX - graphContainerRef.current.getBoundingClientRect().left;

    console.log(
      event.clientX,
      graphContainerRef.current.getBoundingClientRect(),
      deltaX
    );

    let sumPercentage = 0;
    for (let i = 0; i < index; i++) {
      sumPercentage += sections[i].percentage;
    }

    let updatedSections = [...sections];
    let currentPercentage =
      Math.round((deltaX / totalWidth) * 100) - sumPercentage;
    let adjustedPercentage = 0;
    console.log(deltaX, totalWidth);

    if (index < updatedSections.length - 1) {
      const nextIndex = index + 1;
      const currentTotal =
        updatedSections[index].percentage +
        updatedSections[nextIndex].percentage;

      adjustedPercentage = Math.max(
        0,
        Math.min(currentTotal, currentPercentage)
      );
      // console.log(currentTotal, currentPercentage);

      updatedSections[index].percentage = adjustedPercentage;
      updatedSections[nextIndex].percentage = currentTotal - adjustedPercentage;
    }

    // 조정 후 전체 합이 100%를 유지하도록 나머지 섹션 조정
    const total = updatedSections.reduce(
      (acc, section) => acc + section.percentage,
      0
    );
    const difference = 100 - total;
    updatedSections[updatedSections.length - 1].percentage += difference;

    setSections(updatedSections);
  };

  const startDrag = (index) => {
    console.log(index);
    const moveHandler = (event) => {
      handleMouseMove(event, index);
    };

    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  const handleSample = (index) => {
    switch (index) {
      case 0:
        // 수익성 50%, 안정성 5%, 나머지는 15%씩
        setSections([
          { name: "수익성", color: "#FF7676", percentage: 50 },
          { name: "안정성", color: "#FFDD87", percentage: 5 },
          { name: "활동성", color: "#91D600", percentage: 15 },
          { name: "생산성", color: "#87D4FF", percentage: 15 },
          { name: "오공 지수", color: "#C376FF", percentage: 15 },
        ]);
        break;
      case 1:
        // 안정성 50%, 수익성 5%, 나머지는 15%씩
        setSections([
          { name: "수익성", color: "#FF7676", percentage: 5 },
          { name: "안정성", color: "#FFDD87", percentage: 50 },
          { name: "활동성", color: "#91D600", percentage: 15 },
          { name: "생산성", color: "#87D4FF", percentage: 15 },
          { name: "오공 지수", color: "#C376FF", percentage: 15 },
        ]);
        break;
      case 2:
        // 활동성 50%, 안정성 5%, 나머지는 15%씩
        setSections([
          { name: "수익성", color: "#FF7676", percentage: 15 },
          { name: "안정성", color: "#FFDD87", percentage: 5 },
          { name: "활동성", color: "#91D600", percentage: 50 },
          { name: "생산성", color: "#87D4FF", percentage: 15 },
          { name: "오공 지수", color: "#C376FF", percentage: 15 },
        ]);
        break;
      case 3:
        // 생산성 50%, 안정성 5%, 나머지는 15%씩
        setSections([
          { name: "수익성", color: "#FF7676", percentage: 15 },
          { name: "안정성", color: "#FFDD87", percentage: 5 },
          { name: "활동성", color: "#91D600", percentage: 15 },
          { name: "생산성", color: "#87D4FF", percentage: 50 },
          { name: "오공 지수", color: "#C376FF", percentage: 15 },
        ]);
        break;
      case 4:
        // 오공 지수 60%, 나머지는 10%씩
        setSections([
          { name: "수익성", color: "#FF7676", percentage: 10 },
          { name: "안정성", color: "#FFDD87", percentage: 10 },
          { name: "활동성", color: "#91D600", percentage: 10 },
          { name: "생산성", color: "#87D4FF", percentage: 10 },
          { name: "오공 지수", color: "#C376FF", percentage: 60 },
        ]);
        break;
    }
  };

  return (
    <div className="main-body">
      <h3>순위</h3>
      <div className="index-info">
        <div className="index-name">
          <div className="profit">
            <div className="profit-color"></div>
            <p>수익성</p>
          </div>
          <div className="stability">
            <div className="stability-color"></div>
            <p>안정성</p>
          </div>
          <div className="activity">
            <div className="activity-color"></div>
            <p>활동성</p>
          </div>
          <div className="productivity">
            <div className="productivity-color"></div>
            <p>생산성</p>
          </div>
          <div className="ogong">
            <div className="ogong-color"></div>
            <p>오공 지수</p>
          </div>
        </div>
        <Button className="primary">
          <img src="graph-icon.svg" alt="graph" />
          결과 보기
        </Button>
      </div>
      <div className="custom-graph" ref={graphContainerRef}>
        {sections.map((section, index) => (
          <div
            key={index}
            className="custom-graph-section"
            style={{
              background: section.color,
              width: `${section.percentage}%`,
            }}
          >
            {section.percentage.toFixed(0)}%
            {index < sections.length - 1 && (
              <div className="handle" onMouseDown={() => startDrag(index)} />
            )}
          </div>
        ))}
      </div>
      <div className="sample-info">
        <img src="info-icon.svg" alt="info" width="20" />
        <p>비율을 어떻게 설정해야할지 모르겠다면 아래 샘플을 이용해보세요!</p>
      </div>
      <div className="index-sample">
        <label>
          <input
            type="radio"
            id="sample2"
            name="sample1"
            value="sample2"
            onClick={() => handleSample(0)}
          />
          <span>수익성</span>이 높으면 <span>안정성</span>이 낮아도 좋아요!
        </label>
        <label>
          <input
            type="radio"
            id="sample1"
            name="sample1"
            value="sample1"
            onClick={() => handleSample(1)}
          />
          <span>안정성</span>이 높으면 <span>수익성</span>이 낮아도 좋아요!
        </label>
        <label>
          <input
            type="radio"
            id="sample3"
            name="sample1"
            value="sample3"
            onClick={() => handleSample(2)}
          />
          <span>활동성</span>이 높으면 <span>안정성</span>이 낮아도 좋아요!
        </label>
        <label>
          <input
            type="radio"
            id="sample4"
            name="sample1"
            value="sample4"
            onClick={() => handleSample(3)}
          />
          <span>생산성</span>이 높으면 <span>안정성</span>이 낮아도 좋아요!
        </label>
        <label>
          <input
            type="radio"
            id="sample5"
            name="sample1"
            value="sample5"
            onClick={() => handleSample(4)}
          />
          사람들의 <span>심리</span>가 제일 궁금해요!
        </label>
      </div>
    </div>
  );
}

export default CustomGraph;
