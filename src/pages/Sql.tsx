import { Alert, Button, Col, Input, Row, Space } from "antd";
import { format } from "sql-formatter";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Sql() {
  const [input, setInput] = useState("select id,name from users where active=1 order by name");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = () => {
    try {
      setOutput(format(input, { language: "sql" }));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Format failed");
    }
  };

  return (
    <div>
      <PageHeader title="SQL Formatter" description="Pretty-print SQL queries for readability." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Input</label>
          <Input.TextArea rows={12} value={input} onChange={(e) => setInput(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Formatted</label>
          <Input.TextArea rows={12} value={output} readOnly />
        </Col>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={run}>Format</Button>
            <CopyButton text={output} label="Copy" />
          </Space>
          {error && <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />}
        </Col>
      </Row>
    </div>
  );
}
