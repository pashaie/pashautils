import {
  Col,
  Divider,
  Input,
  message,
  Row,
  Space,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadChangeParam, RcFile } from "antd/es/upload";
import { useState } from "react";
import { InboxOutlined, SwapOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { Button } from "antd";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

const { TextArea } = Input;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Only JPG/PNG files are supported");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB");
  }
  return false;
};

export default function Base64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();

  const changeBase64 = (val: string) => {
    try {
      setText(atob(val));
    } catch {
      /* invalid base64 while typing */
    }
    setBase64(val);
  };

  const changeText = (val: string) => {
    try {
      setBase64(btoa(val));
    } catch {
      /* invalid characters while typing */
    }
    setText(val);
  };

  const swap = () => {
    setText(base64);
    try {
      setBase64(btoa(base64));
    } catch {
      setBase64("");
    }
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file as RcFile, (url) => {
      setImageUrl(url);
    });
  };

  return (
    <div>
      <PageHeader
        title="Base64"
        description="Encode or decode text instantly, or convert an image to a data URL."
      />
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={11}>
          <div className="length-label">
            <label className="field-label">Plain text</label>
            <CopyButton text={text} />
          </div>
          <TextArea
            style={{ height: 180, width: "100%" }}
            value={text}
            placeholder="Type or paste plain text…"
            onChange={(e) => changeText(e.target.value)}
          />
        </Col>
        <Col xs={24} md={2} style={{ textAlign: "center" }}>
          <Button
            type="text"
            icon={<SwapOutlined />}
            onClick={swap}
            aria-label="Swap"
          />
        </Col>
        <Col xs={24} md={11}>
          <div className="length-label">
            <label className="field-label">Base64</label>
            <CopyButton text={base64} />
          </div>
          <TextArea
            style={{ height: 180, width: "100%" }}
            value={base64}
            placeholder="Type or paste Base64…"
            onChange={(e) => changeBase64(e.target.value)}
          />
        </Col>
      </Row>

      <Divider>Image → Base64</Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Dragger
            beforeUpload={beforeUpload}
            onChange={handleChange}
            multiple={false}
            showUploadList={false}
            accept="image/png,image/jpeg"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded preview"
                style={{ maxWidth: "100%", maxHeight: 220, objectFit: "contain" }}
              />
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Drop an image here, or click to browse</p>
                <p className="ant-upload-hint">JPG or PNG, up to 2MB</p>
              </>
            )}
          </Dragger>
        </Col>
        <Col xs={24} md={12}>
          <div className="length-label">
            <label className="field-label">Data URL</label>
            <Space>
              <CopyButton text={imageUrl ?? ""} label="Copy" />
            </Space>
          </div>
          <TextArea
            style={{ height: 200, width: "100%" }}
            readOnly
            value={imageUrl}
            placeholder="Image Base64 will appear here…"
          />
        </Col>
      </Row>
    </div>
  );
}
