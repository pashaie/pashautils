import {
  Col,
  Divider,
  message,
  Row,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return false;
};

export default function Base64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();

  const changeBase64 = (val: string) => {
    try {
      const text = atob(val);
      setText(text);
    } catch (e) {}
    setBase64(val);
  };
  const changeText = (val: string) => {
    try {
      const base64 = btoa(val);
      setBase64(base64);
    } catch (e) {}
    setText(val);
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
      <Row gutter={[10, 10]}>
        <Col span={12}>
          Plain Text
          <TextArea
            style={{ height: 200, width: "100%" }}
            value={text}
            onChange={(e) => changeText(e.target.value)}
          />
        </Col>
        <Col span={12}>
          Base64
          <TextArea
            style={{ height: 200, width: "100%" }}
            value={base64}
            onChange={(e) => changeBase64(e.target.value)}
          />
        </Col>
      </Row>
      <Divider>Image</Divider>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          {/* <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            
          >
            
          </Upload> */}

          <Dragger
            beforeUpload={beforeUpload}
            onChange={handleChange}
            multiple={false}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </>
            )}
          </Dragger>
        </Col>
        <Col span={12}>
          Plain Text
          <TextArea
            style={{ height: 200, width: "100%" }}
            readOnly
            value={imageUrl}
            onChange={(e) => changeText(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
}
