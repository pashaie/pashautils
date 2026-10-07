import { Alert, Col, Input, QRCode, Row, Space } from "antd";
import * as OTPAuth from "otpauth";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Totp() {
  const [secret, setSecret] = useState(() => new OTPAuth.Secret({ size: 20 }).base32);
  const [label, setLabel] = useState("PashaUtils");
  const [issuer, setIssuer] = useState("Pasha");
  const [token, setToken] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const totp = useMemo(() => {
    try {
      return new OTPAuth.TOTP({
        issuer,
        label,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret.replace(/\s/g, "")),
      });
    } catch {
      return null;
    }
  }, [secret, label, issuer]);

  const code = totp?.generate() ?? "";
  const remaining = totp ? totp.period - (Math.floor(now / 1000) % totp.period) : 0;
  const uri = totp?.toString() ?? "";

  const verify = () => {
    if (!totp) return false;
    return totp.validate({ token: token.trim(), window: 1 }) !== null;
  };

  return (
    <div className="tool-panel">
      <PageHeader title="TOTP / OTP" description="Generate and verify time-based one-time passwords (RFC 6238)." />
      <Row gutter={[24, 16]}>
        <Col xs={24} md={14}>
          <label className="field-label">Secret (Base32)</label>
          <Input value={secret} onChange={(e) => setSecret(e.target.value)} style={{ marginBottom: 12 }} />
          <label className="field-label">Label</label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} style={{ marginBottom: 12 }} />
          <label className="field-label">Issuer</label>
          <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} style={{ marginBottom: 12 }} />
          <Alert
            type="success"
            showIcon
            message={<span className="password-display">{code || "Invalid secret"}</span>}
            description={`Expires in ${remaining}s`}
            action={<CopyButton text={code} />}
            style={{ marginBottom: 12 }}
          />
          <label className="field-label">Verify token</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder="123456" />
          </Space.Compact>
          {token && (
            <Alert
              style={{ marginTop: 12 }}
              type={verify() ? "success" : "error"}
              showIcon
              message={verify() ? "Valid token" : "Invalid token"}
            />
          )}
        </Col>
        <Col xs={24} md={10}>
          <div className="qr-preview">
            {uri ? <QRCode value={uri} size={160} /> : <span>Invalid secret</span>}
            <CopyButton text={uri} label="Copy otpauth URI" />
          </div>
        </Col>
      </Row>
    </div>
  );
}
