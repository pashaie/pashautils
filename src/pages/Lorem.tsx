import { Button, Col, InputNumber, Row, Space } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat".split(
    " "
  );

function paragraph(words: number) {
  const parts: string[] = [];
  for (let i = 0; i < words; i++) {
    parts.push(WORDS[i % WORDS.length]);
  }
  const text = parts.join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1) + ".";
}

export default function Lorem() {
  const [paragraphs, setParagraphs] = useState(3);
  const [words, setWords] = useState(40);
  const [seed, setSeed] = useState(0);

  const text = useMemo(() => {
    void seed;
    return Array.from({ length: paragraphs }, () => paragraph(words)).join(
      "\n\n"
    );
  }, [paragraphs, words, seed]);

  return (
    <div className="tool-panel">
      <PageHeader
        title="Lorem Ipsum"
        description="Quick placeholder copy for layouts and prototypes."
      />
      <Row gutter={[16, 16]}>
        <Col xs={12} md={6}>
          <label className="field-label">Paragraphs</label>
          <InputNumber min={1} max={20} value={paragraphs} onChange={(v) => setParagraphs(v || 1)} style={{ width: "100%" }} />
        </Col>
        <Col xs={12} md={6}>
          <label className="field-label">Words each</label>
          <InputNumber min={5} max={200} value={words} onChange={(v) => setWords(v || 5)} style={{ width: "100%" }} />
        </Col>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={() => setSeed((s) => s + 1)}>
              Regenerate
            </Button>
            <CopyButton text={text} label="Copy" />
          </Space>
        </Col>
        <Col span={24}>
          <div className="diff-block">{text}</div>
        </Col>
      </Row>
    </div>
  );
}
