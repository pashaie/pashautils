import { Alert, Button, Col, Input, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

function formatXml(xml: string, minify = false) {
  const parsed = new DOMParser().parseFromString(xml, "application/xml");
  const err = parsed.querySelector("parsererror");
  if (err) throw new Error(err.textContent || "Invalid XML");
  if (minify) {
    return new XMLSerializer().serializeToString(parsed).replace(/>\s+</g, "><");
  }
  const serialized = new XMLSerializer().serializeToString(parsed);
  let formatted = "";
  let indent = 0;
  serialized.replace(/(>)(<)(\/*)/g, "$1\n$2$3").split("\n").forEach((line) => {
    if (/^<\/\w/.test(line)) indent = Math.max(indent - 1, 0);
    formatted += `${"  ".repeat(indent)}${line}\n`;
    if (/^<\w[^>]*[^/]>.*$/.test(line)) indent += 1;
  });
  return formatted.trim();
}

export default function Xml() {
  const [input, setInput] = useState("<root><item>1</item><item>2</item></root>");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (minify: boolean) => {
    try {
      setOutput(formatXml(input, minify));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid XML");
    }
  };

  return (
    <div>
      <PageHeader title="XML Formatter" description="Pretty-print or minify XML with browser DOMParser." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Input</label>
          <Input.TextArea rows={12} value={input} onChange={(e) => setInput(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Output</label>
          <Input.TextArea rows={12} value={output} readOnly />
        </Col>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={() => run(false)}>Format</Button>
            <Button onClick={() => run(true)}>Minify</Button>
            <CopyButton text={output} label="Copy" />
          </Space>
          {error && <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />}
        </Col>
      </Row>
    </div>
  );
}
