import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";
import axios from "axios";
import { WeightContext } from "./weightcontext";
import "./styles/style.css";
import { API_URL } from "../main/apis/core";
import { useNavigate } from "react-router-dom";
import { SortedDataContext } from "./sorteddatacontext";

const Lineup = () => {
  const { sliderValues, setStockList, colorList } = useContext(WeightContext);
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setSortedData2 } = useContext(SortedDataContext);
  const [sortedData, setSortedData] = useState([]);
  const colorSample = ["#FAE859", "#506798", "orange", "#86CC80", "pink"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL.LOCAL}/api/corporates/list`
        );
        const weightData = response.data;
        setData(weightData);
        const sortedData = rankSort(sliderValues, weightData);
        setData(sortedData);
        setSortedData(sortedData); // sortedData 설정
        const svg = d3
          .select(svgRef.current)
          .attr("width", 1000)
          .attr("height", weightData.length * 50); // 데이터 길이에 따라 높이 조정
        update(sortedData, svg, ...sliderValues, "group1");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    matchColor();
  }, [colorList]);

  useEffect(() => {
    if (data.length > 0) {
      L_listen(sliderValues, data);
    }
  }, [sliderValues]);

  const matchColor = () => {
    if (colorList.length > 0) {
      setData((prevData) =>
        prevData.map((item) => {
          const colorMatch = colorList.find((color) =>
            color.colorId.includes(item.id)
          );
          if (colorMatch) {
            return {
              ...item,
              color: colorSample[colorMatch.id],
            };
          }
          return item; // 기존 item을 그대로 반환
        })
      );
    }
  };

  const rankSort = (sliderValues, data) => {
    const sortedData = data.sort((a, b) => {
      const colA =
        a.profit * sliderValues[0] +
        a.growth * sliderValues[1] +
        a.safety * sliderValues[2] +
        a.efficiency * sliderValues[3] +
        a.oogong_rate * sliderValues[4];
      const colB =
        b.profit * sliderValues[0] +
        b.growth * sliderValues[1] +
        b.safety * sliderValues[2] +
        b.efficiency * sliderValues[3] +
        b.oogong_rate * sliderValues[4];

      return colB - colA; // 내림차순 정렬
    });

    setStockList(
      sortedData.map((item) => ({
        id: item.id,
        name: item.name,
        profitability: item.profit * sliderValues[0],
        stability: item.safety * sliderValues[2],
        activity: item.efficiency * sliderValues[3],
        potential: item.growth * sliderValues[1],
        ogoong_rate: item.oogong_rate * sliderValues[4],
      }))
    );
    setSortedData2(sortedData); //sortedData lineup2에 전달
    return sortedData;
  };

  const L_listen = (sliderValues, data) => {
    const svg = d3.select(svgRef.current);
    const sortedData = rankSort(sliderValues, data);
    setData(sortedData);
    setSortedData(sortedData); // sortedData 설정
    update(sortedData, svg, ...sliderValues, "group1");
  };

  const update = (
    data,
    svg,
    weight_d,
    weight_s,
    weight_n,
    weight_m,
    weight_q,
    groupClass
  ) => {
    let group = svg.select(`.${groupClass}`);
    if (!group.node()) {
      group = svg.append("g").attr("class", groupClass);
    }

    const height = 50;
    const widthScale = 30;

    const rows = group.selectAll("g.row").data(data, (d) => d.name);

    // Exit
    rows.exit().remove();

    // Enter
    const rowsEnter = rows
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", (d, i) => `translate(0, ${i * height})`)
      .on("click", (event, d) => {
        navigate(`/${d.id}`); // 추후 router로 페이지 이동 작성
      })
      .on("mouseenter", function (event, d) {
        d3.select(this).select("rect.background").attr("fill", "#f0f0f0");
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).select("rect.background").attr("fill", "#ffffff");
      });

    rowsEnter
      .append("rect")
      .attr("class", "background")
      .attr("height", height)
      .attr("width", 750)
      .attr("fill", "#ffffff");

    rowsEnter
      .append("line")
      .attr("x1", 0)
      .attr("x2", 750)
      .attr("y1", height - 1)
      .attr("y2", height - 1)
      .attr("stroke", "#000000")
      .attr("stroke-width", 1);

    rowsEnter
      .append("text")
      .attr("class", "index-text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 1)
      .text((d, i) => i + 1);

    rowsEnter //군집색상
      .append("rect")
      .attr("class", "color-type")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("x", 20)
      .attr("fill", (d) => d.color);

    rowsEnter
      .append("text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 170)
      .text((d) => (d.name.length > 10 ? `${d.name.slice(0, 10)}...` : d.name));

    rowsEnter
      .append("text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 70)
      .text((d) => (d.id.length > 10 ? `${d.id.slice(0, 10)}...` : d.id));

    rowsEnter
      .append("rect")
      .attr("class", "profit-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("x", 350)
      .attr("fill", "#FF7676")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "growth-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#FFDD87")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "safety-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#91D600")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "efficiency-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#87D4FF")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "oogong-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#C376FF")
      .attr("fill-opacity", 0.7);

    // Update
    const rowsUpdate = rows
      .merge(rowsEnter)
      .transition()
      .duration(1000)
      .attr("transform", (d, i) => `translate(0, ${i * height})`);

    rowsUpdate.select(".index-text").text((d, i) => i + 1);

    rowsUpdate
      .select(".color-type")
      .style("width", "30px")
      .style("fill", (d) => d.color);

    rowsUpdate
      .select(".profit-bar")
      .style("width", (d) => (d.profit * weight_d) / widthScale + "px");

    rowsUpdate
      .select(".growth-bar")
      .attr("x", (d) => 350 + (d.profit * weight_d) / widthScale)
      .style("width", (d) => (d.growth * weight_s) / widthScale + "px");

    rowsUpdate
      .select(".safety-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.growth * weight_s) / widthScale
      )
      .style("width", (d) => (d.safety * weight_n) / widthScale + "px");

    rowsUpdate
      .select(".efficiency-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.growth * weight_s) / widthScale +
          (d.safety * weight_n) / widthScale
      )
      .style("width", (d) => (d.efficiency * weight_m) / widthScale + "px");

    rowsUpdate
      .select(".oogong-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.growth * weight_s) / widthScale +
          (d.safety * weight_n) / widthScale +
          (d.efficiency * weight_m) / widthScale
      )
      .style("width", (d) => (d.oogong_rate * weight_q) / widthScale + "px");
  };

  return (
    <footer>
      <div className="body_right">
        <div id="renderer">
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </footer>
  );
};

export default Lineup;
