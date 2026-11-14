import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/main.scss";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
