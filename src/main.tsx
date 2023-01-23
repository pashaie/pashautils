import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Base64 from "./Base64";
import Home from "./Home";
import "./index.css";
import JWT from "./JWT";
import NationalCode from "./NationalCode";
import Pashword from "./Pashword";
import Password from "./Password";
import Qr from "./Qr";

const router = createBrowserRouter([
  {
    path: "/pashautils/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "qr",
        element: <Qr />,
      },
      {
        path: "base64",
        element: <Base64 />,
      },
      {
        path: "password",
        element: <Password />,
      },
      {
        path: "pashword",
        element: <Pashword />,
      },
      {
        path: "nationalCode",
        element: <NationalCode></NationalCode>,
      },
      {
        path: "jwt",
        element: <JWT />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
