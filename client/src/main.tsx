import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@/styles/index.css";
import routes from "@/routes"
import { ParticipantsProvider } from "./context/ParticipantContext";


const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

const root = ReactDOM.createRoot(container);
const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <ParticipantsProvider>
      <RouterProvider router={router} />
    </ParticipantsProvider>
  </React.StrictMode>
);