import React from "react";
import "./index.css";

function interpolateColor(color1, color2, factor) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
  }
  return result;
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default function OgongRate(props) {
  const rate = Number(props.rate).toFixed(1);
  const sliderPosition = `${rate}%`;
  const interpolatedColor = interpolateColor(
    [255, 0, 0],
    [128, 0, 255],
    rate / 100
  );
  const textColor = rgbToHex(
    interpolatedColor[0],
    interpolatedColor[1],
    interpolatedColor[2]
  );
  console.log("textColor: " + textColor);

  return (
    <div>
      <div className="ogong-header">
        <h3>오공지수</h3>
        <div className="ogong-description">
          <img src="info-icon.svg" alt="info" width="12" />
          <p>
            오공지수는 사람들의 감정을 분석해서 긍/부정 비율을 나타내는
            지수입니다.
          </p>
        </div>
        <p></p>
      </div>

      <div className="ogong-bar">
        <div className="ogong-bar-chart" />
        <div className="ogong-lines">
          <img src="graph-line.png" alt="" />
          <p>매우 부정</p>
          <img src="graph-line.png" alt="" />
          <p>부정</p>
          <img src="graph-line.png" alt="" />
          <p>긍정</p>
          <img src="graph-line.png" alt="" />
          <p>매우 긍정</p>
          <img src="graph-line.png" alt="" />
        </div>
      </div>
      <div className="ogong-rate" style={{ left: sliderPosition }}>
        <p style={{ color: textColor }}>{rate}%</p>
        <img src="ogong.svg" alt="ogong" />
      </div>
    </div>
  );
}
