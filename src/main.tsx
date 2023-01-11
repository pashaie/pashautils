import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Base64 from "./Base64";
import "./index.css";
import Qr from "./Qr";

const router = createBrowserRouter([
  {
    path: "/pashautils/",
    element: <App />,
    children: [
      {
        path: "qr",
        element: <Qr />,
      },
      {
        path: "base64",
        element: <Base64 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
