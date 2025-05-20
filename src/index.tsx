import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import "./index.css";
import App from "./App";
import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div>Loading…</div>}>
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
