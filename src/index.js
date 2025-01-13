import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/theme-context";
import { ModalProvider } from "./context/modal-context";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <ThemeProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </ThemeProvider>
);
