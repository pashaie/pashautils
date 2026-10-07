import { Button, Col, Input, InputNumber, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function SvgPng() {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><circle cx="60" cy="60" r="50" fill="#1677ff"/></svg>');
  const [width, setWidth] = useState(256);
  const [png, setPng] = useState("");

  const convert = () => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = img.height / img.width || 1;
      canvas.width = width;
      canvas.height = Math.round(width * ratio);
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      setPng(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div>
      <PageHeader title="SVG → PNG" description="Rasterize SVG markup to a PNG data URL." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <label className="field-label">SVG</label>
          <Input.TextArea rows={12} value={svg} onChange={(e) => setSvg(e.target.value)} />
        </Col>
        <Col xs={24} md={10}>
          <label className="field-label">Width (px)</label>
          <InputNumber style={{ width: "100%", marginBottom: 12 }} min={16} max={2048} value={width} onChange={(v) => setWidth(v || 256)} />
          <Space wrap>
            <Button type="primary" onClick={convert}>Convert</Button>
            {png && <Button href={png} download="export.png">Download PNG</Button>}
            <CopyButton text={png} label="Copy data URL" />
          </Space>
          {png && <img src={png} alt="PNG preview" style={{ display: "block", marginTop: 16, maxWidth: "100%" }} />}
        </Col>
      </Row>
    </div>
  );
}
