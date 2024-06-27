import React from "react";
import "./downbar.css";
export default function Downbar() {
  return (
    <div className="downbar-container">
      <span className="downbar">
        <span className="downbar-item">순위</span>
        <span className="downbar-item group">군집</span>
        <span className="downbar-item stock-code">종목코드</span>
        <span className="downbar-item company-name">기업명</span>
        <span className="downbar-item graph">그래프</span>
      </span>
      <hr className="separator-line" />
    </div>
  );
}
