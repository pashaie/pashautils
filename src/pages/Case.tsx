import { Col, Input, Row } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

function words(input: string) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

export default function Case() {
  const [input, setInput] = useState("helloWorld example");
  const w = useMemo(() => words(input), [input]);

  const variants = [
    { label: "camelCase", value: w.map((x, i) => (i ? x[0].toUpperCase() + x.slice(1) : x)).join("") },
    { label: "PascalCase", value: w.map((x) => x[0].toUpperCase() + x.slice(1)).join("") },
    { label: "snake_case", value: w.join("_") },
    { label: "kebab-case", value: w.join("-") },
    { label: "CONSTANT_CASE", value: w.join("_").toUpperCase() },
    { label: "Title Case", value: w.map((x) => x[0].toUpperCase() + x.slice(1)).join(" ") },
    { label: "lower case", value: w.join(" ") },
    { label: "UPPER CASE", value: w.join(" ").toUpperCase() },
  ];

  return (
    <div className="tool-panel">
      <PageHeader title="Case Converter" description="Convert identifiers between common naming conventions." />
      <label className="field-label">Input</label>
      <Input size="large" value={input} onChange={(e) => setInput(e.target.value)} style={{ marginBottom: 16 }} />
      <Row gutter={[12, 12]}>
        {variants.map((v) => (
          <Col xs={24} md={12} key={v.label}>
            <div className="length-label">
              <span className="field-label">{v.label}</span>
              <CopyButton text={v.value} />
            </div>
            <Input value={v.value} readOnly />
          </Col>
        ))}
      </Row>
    </div>
  );
}
