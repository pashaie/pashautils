import { Col, Divider, QRCode, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

export default function Qr() {
  const [val, setVal] = useState("qr");
  return (
    <div>
      <Row justify="center">
        <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
          <TextArea
            placeholder="text or url"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Divider>QR Code</Divider>
          <QRCode value={val} />
        </Col>
      </Row>
    </div>
  );
}
