import { Alert, Button, Col, Input, Row, Space } from "antd";
import { dump, load } from "js-yaml";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Yaml() {
  const [yamlText, setYamlText] = useState("hello: world\nlist:\n  - one\n  - two\n");
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const toJson = () => {
    try {
      const data = load(yamlText);
      setJsonText(JSON.stringify(data, null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "YAML parse error");
    }
  };

  const toYaml = () => {
    try {
      const data = JSON.parse(jsonText || "null");
      setYamlText(dump(data));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "JSON parse error");
    }
  };

  return (
    <div>
      <PageHeader title="YAML ↔ JSON" description="Convert between YAML and JSON in either direction." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">YAML</label>
          <Input.TextArea rows={14} value={yamlText} onChange={(e) => setYamlText(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">JSON</label>
          <Input.TextArea rows={14} value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
        </Col>
        <Col span={24}>
          <Space wrap>
            <Button type="primary" onClick={toJson}>YAML → JSON</Button>
            <Button onClick={toYaml}>JSON → YAML</Button>
            <CopyButton text={jsonText} label="Copy JSON" />
            <CopyButton text={yamlText} label="Copy YAML" />
          </Space>
          {error && <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />}
        </Col>
      </Row>
    </div>
  );
}
