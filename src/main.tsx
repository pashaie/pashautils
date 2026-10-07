import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import App from "./App";
import Base64 from "./Base64";
import Home from "./Home";
import "./index.css";
import JWT from "./JWT";
import NationalCode from "./NationalCode";
import Pashword from "./Pashword";
import Password from "./Password";
import Qr from "./Qr";
import Tiny from "./Tiny";

const Hash = lazy(() => import("./pages/Hash"));
const Uuid = lazy(() => import("./pages/Uuid"));
const Lorem = lazy(() => import("./pages/Lorem"));
const Diff = lazy(() => import("./pages/Diff"));
const Json = lazy(() => import("./pages/Json"));
const Yaml = lazy(() => import("./pages/Yaml"));
const Xml = lazy(() => import("./pages/Xml"));
const Case = lazy(() => import("./pages/Case"));
const Regex = lazy(() => import("./pages/Regex"));
const UrlCodec = lazy(() => import("./pages/UrlCodec"));
const HtmlCodec = lazy(() => import("./pages/HtmlCodec"));
const Markdown = lazy(() => import("./pages/Markdown"));
const Counter = lazy(() => import("./pages/Counter"));
const Slugify = lazy(() => import("./pages/Slugify"));
const Timestamp = lazy(() => import("./pages/Timestamp"));
const Timezone = lazy(() => import("./pages/Timezone"));
const Cron = lazy(() => import("./pages/Cron"));
const NumBase = lazy(() => import("./pages/NumBase"));
const Units = lazy(() => import("./pages/Units"));
const Color = lazy(() => import("./pages/Color"));
const UserAgent = lazy(() => import("./pages/UserAgent"));
const HttpStatus = lazy(() => import("./pages/HttpStatus"));
const Mime = lazy(() => import("./pages/Mime"));
const Cidr = lazy(() => import("./pages/Cidr"));
const Dns = lazy(() => import("./pages/Dns"));
const Whois = lazy(() => import("./pages/Whois"));
const Hmac = lazy(() => import("./pages/Hmac"));
const Aes = lazy(() => import("./pages/Aes"));
const Totp = lazy(() => import("./pages/Totp"));
const Bcrypt = lazy(() => import("./pages/Bcrypt"));
const Pem = lazy(() => import("./pages/Pem"));
const Strength = lazy(() => import("./pages/Strength"));
const ImgCompress = lazy(() => import("./pages/ImgCompress"));
const Favicon = lazy(() => import("./pages/Favicon"));
const SvgPng = lazy(() => import("./pages/SvgPng"));
const Checksum = lazy(() => import("./pages/Checksum"));
const Exif = lazy(() => import("./pages/Exif"));
const Mobile = lazy(() => import("./pages/Mobile"));
const Sheba = lazy(() => import("./pages/Sheba"));
const Postal = lazy(() => import("./pages/Postal"));
const Jalali = lazy(() => import("./pages/Jalali"));
const NumWords = lazy(() => import("./pages/NumWords"));
const Sql = lazy(() => import("./pages/Sql"));
const Beautify = lazy(() => import("./pages/Beautify"));
const JwtEncode = lazy(() => import("./pages/JwtEncode"));
const Chmod = lazy(() => import("./pages/Chmod"));
const Gitignore = lazy(() => import("./pages/Gitignore"));
const Metatags = lazy(() => import("./pages/Metatags"));

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: 200 }}>
          <Spin />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const lazyPage = (el: React.ReactNode) => <Lazy>{el}</Lazy>;

const router = createBrowserRouter([
  {
    path: "/pashautils/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "qr", element: <Qr /> },
      { path: "base64", element: <Base64 /> },
      { path: "password", element: <Password /> },
      { path: "pashword", element: <Pashword /> },
      { path: "nationalCode", element: <NationalCode /> },
      { path: "jwt", element: <JWT /> },
      { path: "tiny/:id", element: <Tiny /> },
      { path: "tiny", element: <Tiny /> },
      { path: "hash", element: lazyPage(<Hash />) },
      { path: "uuid", element: lazyPage(<Uuid />) },
      { path: "lorem", element: lazyPage(<Lorem />) },
      { path: "diff", element: lazyPage(<Diff />) },
      { path: "json", element: lazyPage(<Json />) },
      { path: "yaml", element: lazyPage(<Yaml />) },
      { path: "xml", element: lazyPage(<Xml />) },
      { path: "case", element: lazyPage(<Case />) },
      { path: "regex", element: lazyPage(<Regex />) },
      { path: "urlcodec", element: lazyPage(<UrlCodec />) },
      { path: "htmlcodec", element: lazyPage(<HtmlCodec />) },
      { path: "markdown", element: lazyPage(<Markdown />) },
      { path: "counter", element: lazyPage(<Counter />) },
      { path: "slugify", element: lazyPage(<Slugify />) },
      { path: "timestamp", element: lazyPage(<Timestamp />) },
      { path: "timezone", element: lazyPage(<Timezone />) },
      { path: "cron", element: lazyPage(<Cron />) },
      { path: "numbase", element: lazyPage(<NumBase />) },
      { path: "units", element: lazyPage(<Units />) },
      { path: "color", element: lazyPage(<Color />) },
      { path: "useragent", element: lazyPage(<UserAgent />) },
      { path: "httpstatus", element: lazyPage(<HttpStatus />) },
      { path: "mime", element: lazyPage(<Mime />) },
      { path: "cidr", element: lazyPage(<Cidr />) },
      { path: "dns", element: lazyPage(<Dns />) },
      { path: "whois", element: lazyPage(<Whois />) },
      { path: "hmac", element: lazyPage(<Hmac />) },
      { path: "aes", element: lazyPage(<Aes />) },
      { path: "totp", element: lazyPage(<Totp />) },
      { path: "bcrypt", element: lazyPage(<Bcrypt />) },
      { path: "pem", element: lazyPage(<Pem />) },
      { path: "strength", element: lazyPage(<Strength />) },
      { path: "imgcompress", element: lazyPage(<ImgCompress />) },
      { path: "favicon", element: lazyPage(<Favicon />) },
      { path: "svgpng", element: lazyPage(<SvgPng />) },
      { path: "checksum", element: lazyPage(<Checksum />) },
      { path: "exif", element: lazyPage(<Exif />) },
      { path: "mobile", element: lazyPage(<Mobile />) },
      { path: "sheba", element: lazyPage(<Sheba />) },
      { path: "postal", element: lazyPage(<Postal />) },
      { path: "jalali", element: lazyPage(<Jalali />) },
      { path: "numwords", element: lazyPage(<NumWords />) },
      { path: "sql", element: lazyPage(<Sql />) },
      { path: "beautify", element: lazyPage(<Beautify />) },
      { path: "jwtencode", element: lazyPage(<JwtEncode />) },
      { path: "chmod", element: lazyPage(<Chmod />) },
      { path: "gitignore", element: lazyPage(<Gitignore />) },
      { path: "metatags", element: lazyPage(<Metatags />) },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
