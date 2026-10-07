import { Button, Col, Input, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

function encodeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(str: string) {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

export default function HtmlCodec() {
  const [plain, setPlain] = useState('<div class="x">Hello & welcome</div>');
  const [encoded, setEncoded] = useState("");

  return (
    <div>
      <PageHeader title="HTML Encode / Decode" description="Escape and unescape HTML entities." />
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
            <Button type="primary" onClick={() => setEncoded(encodeHtml(plain))}>Encode</Button>
            <Button onClick={() => setPlain(decodeHtml(encoded))}>Decode</Button>
            <CopyButton text={encoded} label="Copy encoded" />
          </Space>
        </Col>
      </Row>
    </div>
  );
}
