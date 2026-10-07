import { Col, Input, Row } from "antd";
import * as DiffLib from "diff";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function DiffPage() {
  const [a, setA] = useState("Hello world\nLine two");
  const [b, setB] = useState("Hello there\nLine two\nLine three");

  const parts = useMemo(() => DiffLib.diffLines(a, b), [a, b]);

  return (
    <div>
      <PageHeader
        title="Text Diff"
        description="Compare two texts line-by-line. Green is added, red is removed."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Original</label>
          <Input.TextArea rows={10} value={a} onChange={(e) => setA(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Changed</label>
          <Input.TextArea rows={10} value={b} onChange={(e) => setB(e.target.value)} />
        </Col>
        <Col span={24}>
          <label className="field-label">Diff</label>
          <div className="diff-block">
            {parts.map((part, i) => (
              <span
                key={i}
                className={
                  part.added
                    ? "diff-added"
                    : part.removed
                      ? "diff-removed"
                      : undefined
                }
              >
                {part.value}
              </span>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
