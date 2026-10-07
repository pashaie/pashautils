import { Button, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Exif() {
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");

  const strip = async (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = rej;
      img.src = url;
    });
    URL.revokeObjectURL(url);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d")?.drawImage(img, 0, 0);
    setPreview(canvas.toDataURL("image/jpeg", 0.92));
    setName(file.name.replace(/\.\w+$/, "") + "-clean.jpg");
  };

  return (
    <div className="tool-panel">
      <PageHeader
        title="EXIF Stripper"
        description="Re-encode an image through canvas to drop EXIF and other metadata."
      />
      <Upload.Dragger accept="image/*" showUploadList={false} beforeUpload={(f) => { strip(f); return false; }}>
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Drop an image to strip metadata</p>
      </Upload.Dragger>
      {preview && (
        <>
          <img src={preview} alt="Cleaned" style={{ maxWidth: "100%", marginTop: 16, borderRadius: 8 }} />
          <div style={{ marginTop: 12 }}>
            <Button type="primary" href={preview} download={name}>Download cleaned JPEG</Button>
          </div>
        </>
      )}
    </div>
  );
}
