import { Col, Empty, Form, Input, QRCode, Row, Select, Space } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

const { TextArea } = Input;

type Mode = "text" | "wifi" | "vcard";

function buildWifi(ssid: string, password: string, encryption: string) {
  const esc = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
  return `WIFI:T:${encryption};S:${esc(ssid)};P:${esc(password)};;`;
}

function buildVcard(name: string, phone: string, email: string, org: string) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    org ? `ORG:${org}` : "",
    phone ? `TEL:${phone}` : "",
    email ? `EMAIL:${email}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Qr() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");

  const value = useMemo(() => {
    if (mode === "wifi") return buildWifi(ssid, wifiPass, encryption);
    if (mode === "vcard") return buildVcard(name, phone, email, org);
    return text;
  }, [mode, text, ssid, wifiPass, encryption, name, phone, email, org]);

  const ready = value.trim().length > 0 && value !== "WIFI:T:WPA;S:;P:;;";

  return (
    <div className="tool-panel">
      <PageHeader
        title="QR Code"
        description="Generate a QR from plain text, a Wi‑Fi network, or a contact card."
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Form layout="vertical">
            <Form.Item label="Type">
              <Select
                value={mode}
                onChange={setMode}
                options={[
                  { value: "text", label: "Text / URL" },
                  { value: "wifi", label: "Wi‑Fi" },
                  { value: "vcard", label: "vCard contact" },
                ]}
              />
            </Form.Item>
            {mode === "text" && (
              <Form.Item label="Text or URL">
                <TextArea
                  placeholder="https://example.com or any text…"
                  value={text}
                  rows={5}
                  allowClear
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Item>
            )}
            {mode === "wifi" && (
              <>
                <Form.Item label="Network name (SSID)">
                  <Input value={ssid} onChange={(e) => setSsid(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Encryption">
                  <Select
                    value={encryption}
                    onChange={setEncryption}
                    options={[
                      { value: "WPA", label: "WPA/WPA2" },
                      { value: "WEP", label: "WEP" },
                      { value: "nopass", label: "None" },
                    ]}
                  />
                </Form.Item>
              </>
            )}
            {mode === "vcard" && (
              <>
                <Form.Item label="Full name">
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Item>
                <Form.Item label="Email">
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Organization">
                  <Input value={org} onChange={(e) => setOrg(e.target.value)} />
                </Form.Item>
              </>
            )}
          </Form>
        </Col>
        <Col xs={24} md={10}>
          <div className="qr-preview">
            {ready ? (
              <>
                <QRCode value={value} size={180} />
                <Space>
                  <CopyButton text={value} label="Copy payload" />
                </Space>
              </>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Fill in the fields to preview the QR code"
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
