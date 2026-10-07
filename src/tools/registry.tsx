import {
  BgColorsOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CloudServerOutlined,
  CodeOutlined,
  DiffOutlined,
  FieldBinaryOutlined,
  FileImageOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  FontSizeOutlined,
  GlobalOutlined,
  FieldNumberOutlined,
  Html5Outlined,
  KeyOutlined,
  LinkOutlined,
  LockOutlined,
  MobileOutlined,
  NumberOutlined,
  PartitionOutlined,
  PercentageOutlined,
  PictureOutlined,
  QrcodeOutlined,
  RadarChartOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  SearchOutlined,
  SecurityScanOutlined,
  StarOutlined,
  SwapOutlined,
  ToolOutlined,
  UngroupOutlined,
  UserOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

export type ToolCategory =
  | "featured"
  | "text"
  | "time"
  | "network"
  | "security"
  | "image"
  | "iran"
  | "dev";

export const categoryLabels: Record<ToolCategory, string> = {
  featured: "Featured",
  text: "Text & Data",
  time: "Time & Numbers",
  network: "Network & Web",
  security: "Security",
  image: "Image & File",
  iran: "Iran",
  dev: "Developer",
};

export interface ToolMeta {
  key: string;
  path: string;
  label: string;
  description: string;
  icon: ReactNode;
  category: ToolCategory;
  featured?: boolean;
  keywords?: string[];
}

export const tools: ToolMeta[] = [
  // Featured (existing)
  {
    key: "qr",
    path: "qr",
    label: "QR Code",
    description: "Turn text, URL, Wi‑Fi, or vCard into a QR code.",
    icon: <QrcodeOutlined />,
    category: "featured",
    featured: true,
    keywords: ["qr", "wifi", "vcard"],
  },
  {
    key: "base64",
    path: "base64",
    label: "Base64",
    description: "Encode and decode text, or convert images to Base64.",
    icon: <ReloadOutlined />,
    category: "featured",
    featured: true,
    keywords: ["encode", "decode", "image"],
  },
  {
    key: "password",
    path: "password",
    label: "Password",
    description: "Generate strong random passwords with strength feedback.",
    icon: <KeyOutlined />,
    category: "featured",
    featured: true,
    keywords: ["generator", "random"],
  },
  {
    key: "pashword",
    path: "pashword",
    label: "Pashword",
    description: "Deterministic passwords from website, username, and a secret.",
    icon: <SafetyOutlined />,
    category: "featured",
    featured: true,
    keywords: ["deterministic", "master"],
  },
  {
    key: "nationalCode",
    path: "nationalCode",
    label: "National Code",
    description: "Validate or generate Iranian national ID codes.",
    icon: <GlobalOutlined />,
    category: "featured",
    featured: true,
    keywords: ["meli", "iran", "کد ملی"],
  },
  {
    key: "jwt",
    path: "jwt",
    label: "JWT",
    description: "Decode JWT header and payload instantly.",
    icon: <StarOutlined />,
    category: "featured",
    featured: true,
    keywords: ["token", "decode"],
  },
  {
    key: "tiny",
    path: "tiny",
    label: "Tiny URL",
    description: "Shorten long links and get a QR code for sharing.",
    icon: <LinkOutlined />,
    category: "featured",
    featured: true,
    keywords: ["shortener", "url"],
  },

  // Text & Data
  {
    key: "hash",
    path: "hash",
    label: "Hash",
    description: "MD5, SHA-1, SHA-256, and SHA-512 digests.",
    icon: <FieldNumberOutlined />,
    category: "text",
    keywords: ["md5", "sha"],
  },
  {
    key: "uuid",
    path: "uuid",
    label: "UUID / NanoID",
    description: "Generate UUIDs and short NanoID-style IDs.",
    icon: <UngroupOutlined />,
    category: "text",
  },
  {
    key: "lorem",
    path: "lorem",
    label: "Lorem Ipsum",
    description: "Generate placeholder paragraphs for layouts.",
    icon: <FileTextOutlined />,
    category: "text",
  },
  {
    key: "diff",
    path: "diff",
    label: "Text Diff",
    description: "Compare two texts and highlight changes.",
    icon: <DiffOutlined />,
    category: "text",
  },
  {
    key: "json",
    path: "json",
    label: "JSON",
    description: "Format, validate, and minify JSON.",
    icon: <CodeOutlined />,
    category: "text",
  },
  {
    key: "yaml",
    path: "yaml",
    label: "YAML ↔ JSON",
    description: "Convert between YAML and JSON.",
    icon: <SwapOutlined />,
    category: "text",
  },
  {
    key: "xml",
    path: "xml",
    label: "XML Formatter",
    description: "Pretty-print or minify XML documents.",
    icon: <CodeOutlined />,
    category: "text",
  },
  {
    key: "case",
    path: "case",
    label: "Case Converter",
    description: "camelCase, snake_case, kebab-case, and more.",
    icon: <FontSizeOutlined />,
    category: "text",
  },
  {
    key: "regex",
    path: "regex",
    label: "Regex Tester",
    description: "Test regular expressions with live matches.",
    icon: <SearchOutlined />,
    category: "text",
  },
  {
    key: "urlcodec",
    path: "urlcodec",
    label: "URL Encode",
    description: "Encode and decode URL components.",
    icon: <LinkOutlined />,
    category: "text",
  },
  {
    key: "htmlcodec",
    path: "htmlcodec",
    label: "HTML Encode",
    description: "Escape and unescape HTML entities.",
    icon: <Html5Outlined />,
    category: "text",
  },
  {
    key: "markdown",
    path: "markdown",
    label: "Markdown Preview",
    description: "Live preview of Markdown as HTML.",
    icon: <FileTextOutlined />,
    category: "text",
  },
  {
    key: "counter",
    path: "counter",
    label: "Text Counter",
    description: "Count characters, words, lines, and bytes.",
    icon: <NumberOutlined />,
    category: "text",
  },
  {
    key: "slugify",
    path: "slugify",
    label: "Slugify",
    description: "Turn titles into URL-safe slugs.",
    icon: <LinkOutlined />,
    category: "text",
  },

  // Time & Numbers
  {
    key: "timestamp",
    path: "timestamp",
    label: "Timestamp",
    description: "Convert Unix timestamps to dates and back.",
    icon: <ClockCircleOutlined />,
    category: "time",
  },
  {
    key: "timezone",
    path: "timezone",
    label: "Timezone",
    description: "Convert a time across common timezones.",
    icon: <GlobalOutlined />,
    category: "time",
  },
  {
    key: "cron",
    path: "cron",
    label: "Cron Explainer",
    description: "Translate cron expressions into plain English.",
    icon: <CalendarOutlined />,
    category: "time",
  },
  {
    key: "numbase",
    path: "numbase",
    label: "Number Base",
    description: "Convert between binary, octal, decimal, and hex.",
    icon: <FieldBinaryOutlined />,
    category: "time",
  },
  {
    key: "units",
    path: "units",
    label: "Unit Converter",
    description: "Convert bytes, length, mass, and temperature.",
    icon: <SwapOutlined />,
    category: "time",
  },
  {
    key: "color",
    path: "color",
    label: "Color Converter",
    description: "HEX, RGB, HSL conversion with live preview.",
    icon: <BgColorsOutlined />,
    category: "time",
  },

  // Network
  {
    key: "useragent",
    path: "useragent",
    label: "User-Agent",
    description: "Parse browser and device info from a UA string.",
    icon: <UserOutlined />,
    category: "network",
  },
  {
    key: "httpstatus",
    path: "httpstatus",
    label: "HTTP Status",
    description: "Look up HTTP status codes and meanings.",
    icon: <CloudServerOutlined />,
    category: "network",
  },
  {
    key: "mime",
    path: "mime",
    label: "MIME Types",
    description: "Find MIME types by extension or name.",
    icon: <FileTextOutlined />,
    category: "network",
  },
  {
    key: "cidr",
    path: "cidr",
    label: "IP / CIDR",
    description: "Calculate network ranges from CIDR notation.",
    icon: <PartitionOutlined />,
    category: "network",
  },
  {
    key: "dns",
    path: "dns",
    label: "DNS Lookup",
    description: "Resolve DNS records via Cloudflare DoH.",
    icon: <RadarChartOutlined />,
    category: "network",
  },
  {
    key: "whois",
    path: "whois",
    label: "WHOIS / RDAP",
    description: "Look up domain registration data via RDAP.",
    icon: <SearchOutlined />,
    category: "network",
  },

  // Security
  {
    key: "hmac",
    path: "hmac",
    label: "HMAC",
    description: "Generate HMAC signatures with common digests.",
    icon: <SafetyCertificateOutlined />,
    category: "security",
  },
  {
    key: "aes",
    path: "aes",
    label: "AES Encrypt",
    description: "Encrypt and decrypt text with AES (demo use).",
    icon: <LockOutlined />,
    category: "security",
  },
  {
    key: "totp",
    path: "totp",
    label: "TOTP / OTP",
    description: "Generate and verify time-based one-time passwords.",
    icon: <SafetyOutlined />,
    category: "security",
  },
  {
    key: "bcrypt",
    path: "bcrypt",
    label: "Bcrypt",
    description: "Hash and verify passwords with bcrypt.",
    icon: <LockOutlined />,
    category: "security",
  },
  {
    key: "pem",
    path: "pem",
    label: "PEM Inspector",
    description: "Inspect PEM certificates and keys metadata.",
    icon: <FileProtectOutlined />,
    category: "security",
  },
  {
    key: "strength",
    path: "strength",
    label: "Password Strength",
    description: "Score an existing password without generating one.",
    icon: <SecurityScanOutlined />,
    category: "security",
  },

  // Image & File
  {
    key: "imgcompress",
    path: "imgcompress",
    label: "Image Compress",
    description: "Resize and compress images in the browser.",
    icon: <PictureOutlined />,
    category: "image",
  },
  {
    key: "favicon",
    path: "favicon",
    label: "Favicon Generator",
    description: "Create common favicon sizes from an image.",
    icon: <FileImageOutlined />,
    category: "image",
  },
  {
    key: "svgpng",
    path: "svgpng",
    label: "SVG → PNG",
    description: "Rasterize SVG to PNG or a data URL.",
    icon: <PictureOutlined />,
    category: "image",
  },
  {
    key: "checksum",
    path: "checksum",
    label: "File Checksum",
    description: "Compute SHA-256 (and more) for any file.",
    icon: <FieldNumberOutlined />,
    category: "image",
  },
  {
    key: "exif",
    path: "exif",
    label: "EXIF Stripper",
    description: "Re-encode an image to remove metadata.",
    icon: <FileImageOutlined />,
    category: "image",
  },

  // Iran
  {
    key: "mobile",
    path: "mobile",
    label: "Mobile Number",
    description: "Validate Iranian mobile numbers.",
    icon: <MobileOutlined />,
    category: "iran",
    keywords: ["موبایل", "iran"],
  },
  {
    key: "sheba",
    path: "sheba",
    label: "Sheba / Card",
    description: "Validate IBAN (Sheba) and Iranian card numbers.",
    icon: <NumberOutlined />,
    category: "iran",
    keywords: ["iban", "شبا", "کارت"],
  },
  {
    key: "postal",
    path: "postal",
    label: "Postal Code",
    description: "Validate Iranian 10-digit postal codes.",
    icon: <GlobalOutlined />,
    category: "iran",
    keywords: ["کد پستی"],
  },
  {
    key: "jalali",
    path: "jalali",
    label: "Jalali Date",
    description: "Convert between Jalali and Gregorian dates.",
    icon: <CalendarOutlined />,
    category: "iran",
    keywords: ["شمسی", "میلادی"],
  },
  {
    key: "numwords",
    path: "numwords",
    label: "Number → Words",
    description: "Convert numbers to Persian words.",
    icon: <FontSizeOutlined />,
    category: "iran",
    keywords: ["حروف", "فارسی"],
  },

  // Developer
  {
    key: "sql",
    path: "sql",
    label: "SQL Formatter",
    description: "Pretty-print SQL queries.",
    icon: <CodeOutlined />,
    category: "dev",
  },
  {
    key: "beautify",
    path: "beautify",
    label: "JS / CSS Beautify",
    description: "Minify or beautify JavaScript and CSS.",
    icon: <ToolOutlined />,
    category: "dev",
  },
  {
    key: "jwtencode",
    path: "jwtencode",
    label: "JWT Encoder",
    description: "Build a signed HS256 JWT from header and payload.",
    icon: <StarOutlined />,
    category: "dev",
  },
  {
    key: "chmod",
    path: "chmod",
    label: "Chmod Calculator",
    description: "Convert Unix file permissions to octal and symbolic.",
    icon: <PercentageOutlined />,
    category: "dev",
  },
  {
    key: "gitignore",
    path: "gitignore",
    label: ".gitignore",
    description: "Generate .gitignore from common templates.",
    icon: <FileTextOutlined />,
    category: "dev",
  },
  {
    key: "metatags",
    path: "metatags",
    label: "Meta Tags",
    description: "Preview Open Graph and basic SEO meta tags.",
    icon: <WifiOutlined />,
    category: "dev",
  },
];

export const featuredTools = tools.filter((t) => t.featured);
export const extraTools = tools.filter((t) => !t.featured);

export function getToolByPath(pathname: string): ToolMeta | undefined {
  const segment = pathname.replace(/\/pashautils\/?/, "").split("/")[0];
  if (!segment) return undefined;
  return tools.find((t) => t.key === segment);
}

export function filterTools(query: string): ToolMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((t) => {
    const hay = [t.label, t.description, t.key, ...(t.keywords ?? [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function toolsByCategory(
  list: ToolMeta[] = tools
): Partial<Record<ToolCategory, ToolMeta[]>> {
  return list.reduce<Partial<Record<ToolCategory, ToolMeta[]>>>((acc, tool) => {
    const cat = tool.featured ? "featured" : tool.category;
    (acc[cat] ??= []).push(tool);
    return acc;
  }, {});
}
