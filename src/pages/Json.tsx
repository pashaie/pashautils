import { Alert, Button, Col, Input, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Json() {
  const [input, setInput] = useState('{\n  "hello": "world"\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div>
      <PageHeader
        title="JSON"
        description="Validate, pretty-print, or minify JSON payloads."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Input</label>
          <Input.TextArea rows={14} value={input} onChange={(e) => setInput(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Output</label>
          <Input.TextArea rows={14} value={output} readOnly />
        </Col>
        <Col span={24}>
          <Space wrap>
            <Button type="primary" onClick={() => run(false)}>
              Format
            </Button>
            <Button onClick={() => run(true)}>Minify</Button>
            <CopyButton text={output} label="Copy output" />
          </Space>
          {error && (
            <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />
          )}
        </Col>
      </Row>
    </div>
  );
}
