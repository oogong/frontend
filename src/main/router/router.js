import React from "react";
import Main from "../pages/main";
import Detail from "../pages/detail";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Company from "../../company";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/compare" replace /> },
  { path: "/compare", element: <Main />, index: true },
  { path: "/:code", element: <Detail />, index: true },
]);

export default router;
