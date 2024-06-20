import React, { useState, useRef, useContext } from "react";
import "./main.css";
import Scatter from "../../clustering/components/scatter";
// import "./compare.css";
import { WeightContext } from "../../weightedgraph/weightcontext";

function CustomGraph({ uniqueId, title, visibleCluster }) {
  const { sliderValues, setSliderValues } = useContext(WeightContext);
  const [sections, setSections] = useState([
    { name: "수익성", color: "#FF7676", percentage: sliderValues[0] },
    { name: "안정성", color: "#FFDD87", percentage: sliderValues[1] },
    { name: "활동성", color: "#91D600", percentage: sliderValues[2] },
    { name: "생산성", color: "#87D4FF", percentage: sliderValues[3] },
    { name: "오공 지수", color: "#C376FF", percentage: sliderValues[4] },
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

    let sumPercentage = 0;
    for (let i = 0; i < index; i++) {
      sumPercentage += sections[i].percentage;
    }

    let updatedSections = [...sections];
    let currentPercentage =
      Math.round((deltaX / totalWidth) * 100) - sumPercentage;
    let adjustedPercentage = 0;

    if (index < updatedSections.length - 1) {
      const nextIndex = index + 1;
      const currentTotal =
        updatedSections[index].percentage +
        updatedSections[nextIndex].percentage;

      adjustedPercentage = Math.max(
        0,
        Math.min(currentTotal, currentPercentage)
      );

      updatedSections[index].percentage = adjustedPercentage;
      updatedSections[nextIndex].percentage = currentTotal - adjustedPercentage;
    }

    const total = updatedSections.reduce(
      (acc, section) => acc + section.percentage,
      0
    );
    const difference = 100 - total;
    updatedSections[updatedSections.length - 1].percentage += difference;

    setSections(updatedSections);
    setSliderValues(updatedSections.map((section) => section.percentage));

    // 추가된 부분: sliderValues 상태 확인
    console.log(
      "Updated Slider Values: ",
      updatedSections.map((section) => section.percentage)
    );
  };

  const startDrag = (index) => {
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
    const samples = [
      [
        { name: "수익성", color: "#FF7676", percentage: 50 },
        { name: "안정성", color: "#FFDD87", percentage: 5 },
        { name: "활동성", color: "#91D600", percentage: 15 },
        { name: "생산성", color: "#87D4FF", percentage: 15 },
        { name: "오공 지수", color: "#C376FF", percentage: 15 },
      ],
      [
        { name: "수익성", color: "#FF7676", percentage: 5 },
        { name: "안정성", color: "#FFDD87", percentage: 50 },
        { name: "활동성", color: "#91D600", percentage: 15 },
        { name: "생산성", color: "#87D4FF", percentage: 15 },
        { name: "오공 지수", color: "#C376FF", percentage: 15 },
      ],
      [
        { name: "수익성", color: "#FF7676", percentage: 15 },
        { name: "안정성", color: "#FFDD87", percentage: 5 },
        { name: "활동성", color: "#91D600", percentage: 50 },
        { name: "생산성", color: "#87D4FF", percentage: 15 },
        { name: "오공 지수", color: "#C376FF", percentage: 15 },
      ],
      [
        { name: "수익성", color: "#FF7676", percentage: 15 },
        { name: "안정성", color: "#FFDD87", percentage: 5 },
        { name: "활동성", color: "#91D600", percentage: 15 },
        { name: "생산성", color: "#87D4FF", percentage: 50 },
        { name: "오공 지수", color: "#C376FF", percentage: 15 },
      ],
      [
        { name: "수익성", color: "#FF7676", percentage: 10 },
        { name: "안정성", color: "#FFDD87", percentage: 10 },
        { name: "활동성", color: "#91D600", percentage: 10 },
        { name: "생산성", color: "#87D4FF", percentage: 10 },
        { name: "오공 지수", color: "#C376FF", percentage: 60 },
      ],
    ];
    setSections(samples[index]);
    setSliderValues(samples[index].map((section) => section.percentage));
  };

  return (
    <div className="main-body">
      <h3>{title}</h3>
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
      <div className="sample-list">
        <div>
          <div className="sample-info">
            <img src="info-icon.svg" alt="info" width="20" />
            <p>
              비율을 어떻게 설정해야할지 모르겠다면 아래 샘플을 이용해보세요!
            </p>
          </div>
          <div className="index-sample">
            <label>
              <input
                type="radio"
                id={`${uniqueId}-sample2`}
                name={`${uniqueId}-sample1`}
                value="sample2"
                onClick={() => handleSample(0)}
              />
              <span>수익성</span>이 높으면 <span>안정성</span>이 낮아도 좋아요!
            </label>
            <label>
              <input
                type="radio"
                id={`${uniqueId}-sample1`}
                name={`${uniqueId}-sample1`}
                value="sample1"
                onClick={() => handleSample(1)}
              />
              <span>안정성</span>이 높으면 <span>수익성</span>이 낮아도 좋아요!
            </label>
            <label>
              <input
                type="radio"
                id={`${uniqueId}-sample3`}
                name={`${uniqueId}-sample1`}
                value="sample3"
                onClick={() => handleSample(2)}
              />
              <span>활동성</span>이 높으면 <span>안정성</span>이 낮아도 좋아요!
            </label>
            <label>
              <input
                type="radio"
                id={`${uniqueId}-sample4`}
                name={`${uniqueId}-sample1`}
                value="sample4"
                onClick={() => handleSample(3)}
              />
              <span>생산성</span>이 높으면 <span>안정성</span>이 낮아도 좋아요!
            </label>
            <label>
              <input
                type="radio"
                id={`${uniqueId}-sample5`}
                name={`${uniqueId}-sample1`}
                value="sample5"
                onClick={() => handleSample(4)}
              />
              사람들의 <span>심리</span>가 제일 궁금해요!
            </label>
          </div>
        </div>
        { visibleCluster && <Scatter /> }
      </div>
    </div>
  );
}

export default CustomGraph;
