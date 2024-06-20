import React from "react";
import Main from "../pages/main";
import Detail from "../pages/detail";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Compare from "../pages/compare";

const router = createBrowserRouter([
  { path: "/", element: <Main />, index: true},
  { path: "/compare", element: <Compare />, index: true },
  { path: "/:code", element: <Detail />, index: true },
]);

export default router;
