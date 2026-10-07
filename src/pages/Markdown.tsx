import { Col, Input, Row } from "antd";
import { marked } from "marked";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Markdown() {
  const [md, setMd] = useState("# Hello\n\nWrite **Markdown** here.\n\n- one\n- two");
  const html = useMemo(() => marked.parse(md, { async: false }) as string, [md]);

  return (
    <div>
      <PageHeader title="Markdown Preview" description="Live HTML preview of Markdown. Rendering stays in your browser." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Markdown</label>
          <Input.TextArea rows={16} value={md} onChange={(e) => setMd(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Preview</label>
          <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: html }} />
        </Col>
      </Row>
    </div>
  );
}
