import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scatter from "../../clustering/components/scatter";
import Navbar from "../../components/Navbar/Navbar";

export default function main() {
  return (
    <>
      <Navbar />
      <Scatter />
    </>
  );
}
