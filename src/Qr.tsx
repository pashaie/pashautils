import { Col, Empty, Input, Row, Space } from "antd";
import { QRCode } from "antd";
import { useState } from "react";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

const { TextArea } = Input;

export default function Qr() {
  const [val, setVal] = useState("");

  return (
    <div className="tool-panel">
      <PageHeader
        title="QR Code"
        description="Enter text or a URL to generate a QR code you can scan or share."
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <label className="field-label">Text or URL</label>
          <TextArea
            placeholder="https://example.com or any text…"
            value={val}
            rows={5}
            allowClear
            onChange={(e) => setVal(e.target.value)}
          />
        </Col>
        <Col xs={24} md={10}>
          <div className="qr-preview">
            {val.trim() ? (
              <>
                <QRCode value={val} size={180} />
                <Space>
                  <CopyButton text={val} label="Copy text" />
                </Space>
              </>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Type something to preview the QR code"
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
