import React from "react";
import Main from "./main";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/compare", element: <Main />, index: true },
  { path: "/{code}", element: <></>, index: true },
]);

export default router;
