import "./App.css";
import mainRouter from "./main/pages/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
