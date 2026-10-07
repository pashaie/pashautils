import { Button, Col, InputNumber, Row, Slider, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

async function loadImage(file: File) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
  URL.revokeObjectURL(url);
  return img;
}

export default function ImgCompress() {
  const [preview, setPreview] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [outSize, setOutSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1280);
  const [file, setFile] = useState<File | null>(null);

  const process = async (f: File, q: number, width: number) => {
    const img = await loadImage(f);
    const scale = Math.min(1, width / img.width);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", q);
    setPreview(dataUrl);
    setOutSize(Math.round((dataUrl.length * 3) / 4));
  };

  return (
    <div className="tool-panel">
      <PageHeader title="Image Compress" description="Resize and JPEG-compress an image entirely in your browser." />
      <Upload.Dragger
        accept="image/*"
        showUploadList={false}
        beforeUpload={(f) => {
          setFile(f);
          setOriginalSize(f.size);
          process(f, quality, maxWidth);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Drop an image or click to browse</p>
      </Upload.Dragger>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <label className="field-label">Quality ({Math.round(quality * 100)}%)</label>
          <Slider min={0.1} max={1} step={0.05} value={quality} onChange={(v) => {
            setQuality(v);
            if (file) process(file, v, maxWidth);
          }} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Max width (px)</label>
          <InputNumber style={{ width: "100%" }} min={64} max={4096} value={maxWidth} onChange={(v) => {
            const w = v || 1280;
            setMaxWidth(w);
            if (file) process(file, quality, w);
          }} />
        </Col>
      </Row>
      {preview && (
        <>
          <p style={{ marginTop: 12 }}>
            Original ~{(originalSize / 1024).toFixed(1)} KB → Output ~{(outSize / 1024).toFixed(1)} KB
          </p>
          <img src={preview} alt="Compressed preview" style={{ maxWidth: "100%", borderRadius: 8 }} />
          <div style={{ marginTop: 12 }}>
            <Button type="primary" href={preview} download="compressed.jpg">Download JPEG</Button>
          </div>
        </>
      )}
    </div>
  );
}
