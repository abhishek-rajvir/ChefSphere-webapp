import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: "we are home",
//     errorElement: <NotFoundPage />,
//   },
//   { path: "/login", element: <LoginPage />, errorElement: <NotFoundPage /> },
//  ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* For notifications */}
      <Toaster richColors closeButton position="top-right" />
    </BrowserRouter>
  </StrictMode>,
);
