import {
  GlobalOutlined,
  KeyOutlined,
  LinkOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  SafetyOutlined,
  StarOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

export interface ToolMeta {
  key: string;
  path: string;
  label: string;
  description: string;
  icon: ReactNode;
}

export const tools: ToolMeta[] = [
  {
    key: "qr",
    path: "qr",
    label: "QR Code",
    description: "Turn any text or URL into a scannable QR code.",
    icon: <QrcodeOutlined />,
  },
  {
    key: "base64",
    path: "base64",
    label: "Base64",
    description: "Encode and decode text, or convert images to Base64.",
    icon: <ReloadOutlined />,
  },
  {
    key: "password",
    path: "password",
    label: "Password",
    description: "Generate strong random passwords with strength feedback.",
    icon: <KeyOutlined />,
  },
  {
    key: "pashword",
    path: "pashword",
    label: "Pashword",
    description: "Deterministic passwords from website, username, and a secret.",
    icon: <SafetyOutlined />,
  },
  {
    key: "nationalCode",
    path: "nationalCode",
    label: "National Code",
    description: "Validate or generate Iranian national ID codes.",
    icon: <GlobalOutlined />,
  },
  {
    key: "jwt",
    path: "jwt",
    label: "JWT",
    description: "Decode JWT header and payload instantly.",
    icon: <StarOutlined />,
  },
  {
    key: "tiny",
    path: "tiny",
    label: "Tiny URL",
    description: "Shorten long links and get a QR code for sharing.",
    icon: <LinkOutlined />,
  },
];

export function getToolByPath(pathname: string): ToolMeta | undefined {
  const segment = pathname.replace(/\/pashautils\/?/, "").split("/")[0];
  if (!segment) return undefined;
  return tools.find((t) => t.key === segment);
}
