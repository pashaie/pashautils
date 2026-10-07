import { Alert, Button, Col, Input, Row, Select, Space } from "antd";
import { css_beautify, js_beautify } from "js-beautify";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Beautify() {
  const [lang, setLang] = useState<"js" | "css">("js");
  const [input, setInput] = useState('function hi(){console.log("hello")}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const beautify = () => {
    try {
      setOutput(lang === "js" ? js_beautify(input) : css_beautify(input));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beautify failed");
    }
  };

  const minify = () => {
    try {
      setOutput(input.replace(/\s+/g, " ").trim());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Minify failed");
    }
  };

  return (
    <div>
      <PageHeader title="JS / CSS Beautify" description="Beautify or roughly minify JavaScript and CSS." />
      <Select
        style={{ width: 160, marginBottom: 12 }}
        value={lang}
        onChange={setLang}
        options={[
          { value: "js", label: "JavaScript" },
          { value: "css", label: "CSS" },
        ]}
      />
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
            <Button type="primary" onClick={beautify}>Beautify</Button>
            <Button onClick={minify}>Minify</Button>
            <CopyButton text={output} label="Copy" />
          </Space>
          {error && <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />}
        </Col>
      </Row>
    </div>
  );
}
