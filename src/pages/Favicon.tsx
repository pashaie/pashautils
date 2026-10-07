import { Button, Space, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

const SIZES = [16, 32, 48, 64, 128, 180, 192, 512];

async function makeSize(file: File, size: number) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = rej;
    img.src = url;
  });
  URL.revokeObjectURL(url);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");
  ctx.drawImage(img, 0, 0, size, size);
  return canvas.toDataURL("image/png");
}

export default function Favicon() {
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);

  return (
    <div className="tool-panel">
      <PageHeader title="Favicon Generator" description="Create square PNG favicons in common sizes from one image." />
      <Upload.Dragger
        accept="image/*"
        showUploadList={false}
        beforeUpload={async (file) => {
          const out = await Promise.all(SIZES.map(async (size) => ({ size, url: await makeSize(file, size) })));
          setPreviews(out);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Drop a square-ish image</p>
      </Upload.Dragger>
      <Space wrap style={{ marginTop: 16 }}>
        {previews.map((p) => (
          <div key={p.size} style={{ textAlign: "center" }}>
            <img src={p.url} alt={`${p.size}`} width={p.size > 64 ? 64 : p.size} height={p.size > 64 ? 64 : p.size} style={{ imageRendering: "pixelated", border: "1px solid #eee" }} />
            <div>
              <Button type="link" href={p.url} download={`favicon-${p.size}.png`}>{p.size}×{p.size}</Button>
            </div>
          </div>
        ))}
      </Space>
    </div>
  );
}
