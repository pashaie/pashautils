import { Alert, Button, Col, Input, Row, Space } from "antd";
import CryptoJS from "crypto-js";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

function b64url(input: string | CryptoJS.lib.WordArray) {
  const str =
    typeof input === "string"
      ? CryptoJS.enc.Utf8.parse(input).toString(CryptoJS.enc.Base64)
      : input.toString(CryptoJS.enc.Base64);
  return str.replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export default function JwtEncode() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "123",\n  "name": "Pasha"\n}');
  const [secret, setSecret] = useState("secret");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      JSON.parse(header);
      JSON.parse(payload);
      const h = b64url(header);
      const p = b64url(payload);
      const data = `${h}.${p}`;
      const sig = CryptoJS.HmacSHA256(data, secret);
      setToken(`${data}.${b64url(sig)}`);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encode failed");
      setToken("");
    }
  };

  return (
    <div>
      <PageHeader title="JWT Encoder" description="Build an HS256 JWT from header, payload, and a shared secret." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Header</label>
          <Input.TextArea rows={8} value={header} onChange={(e) => setHeader(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Payload</label>
          <Input.TextArea rows={8} value={payload} onChange={(e) => setPayload(e.target.value)} />
        </Col>
        <Col span={24}>
          <label className="field-label">Secret</label>
          <Input.Password value={secret} onChange={(e) => setSecret(e.target.value)} />
        </Col>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={encode}>Encode</Button>
            <CopyButton text={token} label="Copy token" />
          </Space>
          {error && <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />}
          {token && <Alert style={{ marginTop: 12 }} type="success" showIcon message={<span className="password-display">{token}</span>} />}
        </Col>
      </Row>
    </div>
  );
}
