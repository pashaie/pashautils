import { Button, Col, Input, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function UrlCodec() {
  const [plain, setPlain] = useState("https://example.com/?q=hello world");
  const [encoded, setEncoded] = useState("");

  return (
    <div>
      <PageHeader title="URL Encode / Decode" description="Encode or decode URL components safely." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Plain</label>
          <Input.TextArea rows={8} value={plain} onChange={(e) => setPlain(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Encoded</label>
          <Input.TextArea rows={8} value={encoded} onChange={(e) => setEncoded(e.target.value)} />
        </Col>
        <Col span={24}>
          <Space wrap>
            <Button type="primary" onClick={() => setEncoded(encodeURIComponent(plain))}>Encode</Button>
            <Button onClick={() => setPlain(decodeURIComponent(encoded))}>Decode</Button>
            <CopyButton text={encoded} label="Copy encoded" />
            <CopyButton text={plain} label="Copy plain" />
          </Space>
        </Col>
      </Row>
    </div>
  );
}
