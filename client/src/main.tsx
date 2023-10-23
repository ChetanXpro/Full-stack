import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <Toaster />

        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
