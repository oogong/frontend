import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";
import _ from "lodash";
import axios from "axios";
import "./styles/style.css";
import { WeightContext } from "./weightcontext";
import { SortedDataContext } from "./sorteddatacontext";
import { API_URL } from "../main/apis/core";
import { useNavigate } from "react-router-dom";
import "./lineup.css";
import { GroupColors } from "../clustering/components/colorByGroup";

const Lineup2 = () => {
  const { sortedData2 } = useContext(SortedDataContext);
  const { sliderValues, setStockList, colorList } = useContext(WeightContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const svgRef = useRef();
  const colorSample = ["#FAE859", "#506798", "orange", "#86CC80", "pink"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL.LOCAL}/api/corporates/list`
        );
        const weightData = response.data;
        console.log("Fetched data:", weightData); // Log fetched data
        setData(weightData);
        if (sliderValues && sliderValues.length >= 5) {
          const sortedData = rankSort(sliderValues, weightData);
          console.log("Sorted data:", sortedData); // Log sorted data
          setData(sortedData);

          const svg = d3
            .select(svgRef.current)
            .attr("width", 800)
            .attr("height", sortedData.length * 50 + 100); // 데이터 길이에 따라 높이 조정
          if (data && data.length > 0) {
            matchColor().then((d) => {
              console.log("Matched color data:", d); // Log matched color data
              setData(d);
              update(d, svg, ...sliderValues, "group1");
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sliderValues]);

  useEffect(() => {
    if (data && data.length > 0) {
      matchColor().then((d) => {
        console.log(d);
        setData(d);
        const svg = d3
          .select(svgRef.current)
          .attr("width", 800)
          .attr("height", d.length * 50 + 100); // 데이터 길이에 따라 높이 조정
        return update(d, svg, ...sliderValues, "group1");
      });
    }
  }, [colorList]);

  useEffect(() => {
    if (data && data.length > 0 && sliderValues && sliderValues.length >= 5) {
      L_listen(sliderValues, data);
    }
  }, [sliderValues]);

  const matchColor = async () => {
    if (colorList.length > 0) {
      const returnData = await data.map((item) => {
        const colorMatch = colorList.find((color) =>
          color.colorId.includes(item.id)
        );
        if (colorMatch) {
          return {
            ...item,
            color: GroupColors[colorMatch.id],
          };
        }
        return item; // 기존 item을 그대로 반환
      });
      return returnData;
    }
    return data; //
  };

  const rankSort = (sliderValues, data) => {
    const sortedData = data.sort((a, b) => {
      const colA =
        a.profit * sliderValues[0] +
        a.safety * sliderValues[1] +
        a.growth * sliderValues[2] +
        a.efficiency * sliderValues[3] +
        a.oogong_rate * sliderValues[4];
      const colB =
        b.profit * sliderValues[0] +
        b.safety * sliderValues[1] +
        b.growth * sliderValues[2] +
        b.efficiency * sliderValues[3] +
        b.oogong_rate * sliderValues[4];

      return colB - colA; // 내림차순 정렬
    });

    setStockList(
      sortedData.map((item) => ({
        id: item.id,
        name: item.name,
        profitability: item.profit * sliderValues[0],
        stability: item.safety * sliderValues[1],
        potential: item.growth * sliderValues[2],
        activity: item.efficiency * sliderValues[3],
        ogoong_rate: item.oogong_rate * sliderValues[4],
      }))
    );

    const newarray = difrank(sortedData, sortedData2);
    update(
      sortedData,
      d3.select(svgRef.current),
      ...sliderValues,
      "group1",
      newarray
    );
    return sortedData;
  };

  const difrank = (sortedData, sortedData2) => {
    const newarray = [];
    for (let i = 0; i < sortedData.length; i++) {
      for (let j = 0; j < sortedData2.length; j++) {
        if (sortedData[i].id === sortedData2[j].id) {
          newarray.push(j - i);
        }
      }
    }
    return newarray;
  };

  const L_listen = (sliderValues, data) => {
    const svg = d3.select(svgRef.current);
    const sortedData = rankSort(sliderValues, data);
    setData(sortedData);
    const newarray = difrank(sortedData, sortedData2);
    update(sortedData, svg, ...sliderValues, "group1", newarray);
  };

  const update = (
    data,
    svg,
    weight_d,
    weight_s,
    weight_n,
    weight_m,
    weight_q,
    groupClass,
    newarray
  ) => {
    let group = svg.select(`.${groupClass}`);
    if (!group.node()) {
      group = svg.append("g").attr("class", groupClass);
    }

    const height = 50;
    const widthScale = 30;

    const rows = group.selectAll("g.row").data(data, (d) => d.name);

    rows.exit().remove();

    const rowsEnter = rows
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", (d, i) => `translate(0, ${i * height} + 20)`)
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
      .attr("width", 800)
      .attr("fill", "#ffffff");

    rowsEnter
      .append("line")
      .attr("x1", 0)
      .attr("x2", 900)
      .attr("y1", height - 1)
      .attr("y2", height - 1)
      .attr("stroke", "#000000")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.15); // 투명도 설정

    rowsEnter
      .append("text")
      .attr("class", "index-text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 1)
      .attr("font-weight", "bold")
      .text((d, i) => i + 1);

    rowsEnter // 군집색상
      .append("circle")
      .attr("class", "color-type")
      .attr("cx", 55) // x 좌표, rect의 x 속성에서 반지름을 더한 값으로 설정
      .attr("cy", height / 2) // y 좌표, rect의 y와 height를 이용하여 중앙에 위치하도록 설정
      .attr("r", (height - 20) / 2) // 반지름, rect의 height를 사용하여 원의 크기 설정
      .attr("fill", (d) => d.color);

    rowsEnter
      .append("text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 200)
      .attr("font-weight", "bold")
      .text((d) => (d.name.length > 10 ? `${d.name.slice(0, 10)}...` : d.name));

    rowsEnter
      .append("text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 100)
      .attr("font-weight", "bold")
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
      .attr("class", "safety-bar")
      .attr("y", 10)
      .attr("height", height - 20)
      .attr("fill", "#FFDD87")
      .attr("fill-opacity", 0.7);

    rowsEnter
      .append("rect")
      .attr("class", "growth-bar")
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

    rowsEnter
      .append("text")
      .attr("class", "newarray-text")
      .attr("y", 30)
      .attr("font-size", 15)
      .attr("x", 620)
      .attr("font-weight", "bold")
      .text((d, i) => newarray[i]);

    const rowsUpdate = rows
      .merge(rowsEnter)
      .transition()
      .duration(1000)
      .attr("transform", (d, i) => `translate(0, ${i * height})`);

    rowsUpdate.select(".index-text").text((d, i) => i + 1);

    rowsUpdate
      .select(".color-type")
      .attr("cx", 55) // x 좌표
      .attr("cy", (d) => height / 2) // y 좌표
      .attr("r", (d) => (height - 20) / 2) // 반지름
      .attr("fill", (d) => d.color);

    rowsUpdate
      .select(".profit-bar")
      .style("width", (d) => (d.profit * weight_d) / widthScale + "px");

    rowsUpdate
      .select(".safety-bar")
      .attr("x", (d) => 350 + (d.profit * weight_d) / widthScale)
      .style("width", (d) => (d.safety * weight_s) / widthScale + "px");

    rowsUpdate
      .select(".growth-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.safety * weight_s) / widthScale
      )
      .style("width", (d) => (d.growth * weight_n) / widthScale + "px");

    rowsUpdate
      .select(".efficiency-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.safety * weight_s) / widthScale +
          (d.growth * weight_n) / widthScale
      )
      .style("width", (d) => (d.efficiency * weight_m) / widthScale + "px");

    rowsUpdate
      .select(".oogong-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d.profit * weight_d) / widthScale +
          (d.safety * weight_s) / widthScale +
          (d.growth * weight_n) / widthScale +
          (d.efficiency * weight_m) / widthScale
      )
      .style("width", (d) => (d.oogong_rate * weight_q) / widthScale + "px");

    if (Array.isArray(newarray) && newarray.length > 0) {
      rowsUpdate.select(".newarray-text").each(function (d, i) {
        const value = newarray[i];
        const absValue = Math.abs(value);
        console.log("Index:", i, "Value:", newarray[i]); // Debugging statement

        // 기존 텍스트 요소를 초기화
        d3.select(this).text("");

        // 기존의 svg 요소를 초기화
        d3.select(this.parentNode).selectAll("svg").remove();

        const textElement = d3.select(this);

        if (newarray[i] > 0) {
          const svg = d3
            .select(this.parentNode)
            .append("svg")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", +d3.select(this).attr("x") - 15)
            .attr("y", +d3.select(this).attr("y") - 15); // 위치를 텍스트 옆으로 조정

          svg
            .append("polygon")
            .attr("points", "10,0 0,20 20,20")
            .attr("fill", "red");

          textElement
            .append("tspan")
            .text(absValue)
            .attr("fill", "red")
            .attr("x", +d3.select(this).attr("x") + 25); // 텍스트 위치를 조정
        } else if (newarray[i] < 0) {
          const svg = d3
            .select(this.parentNode)
            .append("svg")
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", +d3.select(this).attr("x") - 15)
            .attr("y", +d3.select(this).attr("y") - 15); // 위치를 텍스트 옆으로 조정

          svg
            .append("polygon")
            .attr("points", "0,0 20,0 10,20")
            .attr("fill", "blue");

          textElement
            .append("tspan")
            .text(absValue)
            .attr("fill", "blue")
            .attr("x", +d3.select(this).attr("x") + 25); // 텍스트 위치를 조정
        } else {
          textElement.append("tspan").text(absValue).attr("fill", "black");
        }
      });
    }
  };
  return (
    <footer>
      <div className="body_right">
        <div id="renderer">
          <svg ref={svgRef} style={{ marginLeft: "0px" }}></svg>
        </div>
      </div>
    </footer>
  );
};

export default Lineup2;
