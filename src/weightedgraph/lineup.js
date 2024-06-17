import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";
import _ from "lodash";
import axios from "axios";
import { WeightContext } from "./weightcontext";
import "./styles/style.css";

const Lineup = () => {
  const { sliderValues } = useContext(WeightContext);
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [rankOrigin, setRankOrigin] = useState({});
  const [rankWeighted, setRankWeighted] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-35-199-226.ap-northeast-2.compute.amazonaws.com/api/corporates/list"
        );
        const weightData = response.data;
        console.log("Fetched data", weightData);
        setData(weightData);
        const initialRank = makeRank(weightData);
        console.log(initialRank);
        setRankOrigin(initialRank);
        const svg = d3
          .select(svgRef.current)
          .attr("width", 1000)
          .attr("height", 3600);
        update(weightData, svg, 20, 20, 20, 20, 20, "group1");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.log("L_listen", sliderValues);
      L_listen(sliderValues, data);
    }
  }, [sliderValues]);

  const rankSort = async (w_d, w_s, w_n, w_m, w_q, data) => {
    // console.log("Weights", w_d, w_s, w_n, w_m, w_q, data);
    const sortedData = _.sortBy(data, (each) => {
      const col =
        each["profit"] * w_d +
        each["growth"] * w_s +
        each["safety"] * w_n +
        each["efficiency"] * w_m +
        each["oogong_rate"] * w_q;
      return -col;
    });
    return sortedData;
  };

  const makeRank = (data) => {
    const rank = {};
    data.forEach((d, i) => (rank[d.name] = i));
    console.log(rank);
    return rank;
  };

  const L_listen = async (sliderValues, d) => {
    const [c0, c1, c2, c3, c4] = sliderValues;
    const svg = d3.select(svgRef.current);
    console.log("Current Slider Values: ", sliderValues);
    console.log("data: ", d);
    rankSort(c0, c1, c2, c3, c4, d)
      .then((sortedData) => {
        setData(sortedData);
        return [sortedData, sortedData];
      })
      .then((newRank) => {
        setRankWeighted(newRank[1]);
        return newRank[0];
      })
      .then((sortedData) =>
        update(sortedData, svg, c0, c1, c2, c3, c4, "group1")
      );

    return true;
  };

  const update = async (
    data,
    svg,
    weight_d,
    weight_s,
    weight_n,
    weight_m,
    weight_q,
    groupClass
  ) => {
    console.log("update", groupClass);

    let group = svg.select(`.${groupClass}`);
    if (!group.node()) {
      group = svg.append("g").attr("class", groupClass);
    }

    const height = 50;
    const widthScale = 12; // Scale factor for the bar widths

    const rows = group.selectAll("g.row").data(data, (d) => d.name);

    // Exit
    // rows.exit().remove();

    // Enter
    const rowsEnter = rows
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", (d, i) => `translate(0, ${i * height})`);

    rowsEnter
      .append("rect")
      .attr("height", height)
      .attr("width", 750)
      .attr("fill", "#ffffff");

    rowsEnter
      .append("line")
      .attr("x1", 0)
      .attr("x2", 750)
      .attr("y1", height - 1)
      .attr("y2", height - 1)
      .attr("stroke", "#000000") // Change this to your desired underline color
      .attr("stroke-width", 1);

    rowsEnter
      .append("text")
      .attr("y", 30)
      .attr("font-size", 13)
      .attr("x", 1)
      .text((d, i) => `${i + 1}`);

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

    rowsUpdate
      .select(".profit-bar")
      .style("width", (d) => (d["profit"] * weight_d) / widthScale + "px");

    rowsUpdate
      .select(".growth-bar")
      .attr("x", (d) => 350 + (d["profit"] * weight_d) / widthScale)
      .style("width", (d) => (d["growth"] * weight_s) / widthScale + "px");

    rowsUpdate
      .select(".safety-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d["profit"] * weight_d) / widthScale +
          (d["growth"] * weight_s) / widthScale
      )
      .style("width", (d) => (d["safety"] * weight_n) / widthScale + "px");

    rowsUpdate
      .select(".efficiency-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d["profit"] * weight_d) / widthScale +
          (d["growth"] * weight_s) / widthScale +
          (d["safety"] * weight_n) / widthScale
      )
      .style("width", (d) => (d["efficiency"] * weight_m) / widthScale + "px");

    rowsUpdate
      .select(".oogong-bar")
      .attr(
        "x",
        (d) =>
          350 +
          (d["profit"] * weight_d) / widthScale +
          (d["growth"] * weight_s) / widthScale +
          (d["safety"] * weight_n) / widthScale +
          (d["efficiency"] * weight_m) / widthScale
      )
      .style("width", (d) => (d["oogong_rate"] * weight_q) / widthScale + "px");
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
