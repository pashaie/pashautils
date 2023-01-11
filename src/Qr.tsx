import { Input, Row, Space } from "antd";
import React, { useState } from "react";
import QRCode from "react-qr-code";

export default function Qr() {
  const [val, setVal] = useState("");
  return (
    <div>
      <Row>
        <Input
          placeholder="text or url"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </Row>
      <Row>
        <QRCode size={128} value={val} />
      </Row>
    </div>
  );
}
