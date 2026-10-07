import { Alert, Col, Input, Row, Typography } from "antd";
import { useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

const { TextArea } = Input;
const { Text } = Typography;

export default function JWT() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => {
    const trimmed = token.trim();
    if (!trimmed) {
      return { status: "empty" as const, header: "", payload: "", error: "" };
    }
    try {
      const header = jwtDecode(trimmed, { header: true });
      const payload = jwtDecode(trimmed);
      return {
        status: "ok" as const,
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        error: "",
      };
    } catch (e) {
      return {
        status: "error" as const,
        header: "",
        payload: "",
        error: e instanceof Error ? e.message : "Invalid JWT",
      };
    }
  }, [token]);

  const combined =
    decoded.status === "ok"
      ? `// Header\n${decoded.header}\n\n// Payload\n${decoded.payload}`
      : "";

  return (
    <div className="tool-panel">
      <PageHeader
        title="JWT Decoder"
        description="Paste a token to inspect its header and payload. Nothing is sent to a server."
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <label className="field-label">Token</label>
          <TextArea
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…"
            value={token}
            rows={4}
            allowClear
            status={decoded.status === "error" ? "error" : undefined}
            onChange={(e) => setToken(e.target.value)}
          />
        </Col>

        {decoded.status === "error" && (
          <Col span={24}>
            <Alert type="error" showIcon message="Could not decode token" description={decoded.error} />
          </Col>
        )}

        {decoded.status === "ok" && (
          <>
            <Col xs={24} md={12}>
              <div className="length-label">
                <Text strong>Header</Text>
                <CopyButton text={decoded.header} />
              </div>
              <code className="jwt-output">{decoded.header}</code>
            </Col>
            <Col xs={24} md={12}>
              <div className="length-label">
                <Text strong>Payload</Text>
                <CopyButton text={decoded.payload} />
              </div>
              <code className="jwt-output">{decoded.payload}</code>
            </Col>
            <Col span={24}>
              <CopyButton text={combined} label="Copy all" type="primary" />
            </Col>
          </>
        )}

        {decoded.status === "empty" && (
          <Col span={24}>
            <code className="jwt-output jwt-output--empty">
              Decoded header and payload will show up here.
            </code>
          </Col>
        )}
      </Row>
    </div>
  );
}
