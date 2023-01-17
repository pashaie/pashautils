import { Col, Divider, QRCode, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

export default function Qr() {
  const [val, setVal] = useState("qr");
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <TextArea
            placeholder="text or url"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Divider></Divider>
          <QRCode size={128} value={val} />
        </Col>
      </Row>
    </div>
  );
}
