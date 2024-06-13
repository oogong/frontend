import "./App.css";
import mainRouter from "./main/router/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
