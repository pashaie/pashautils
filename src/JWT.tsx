import { Row, Col, Divider, QRCode } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function JWT() {
  const [token, setToken] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    try {
      const header = jwtDecode(token, { header: true });
      const payload = jwtDecode(token);
      setData(
        `${JSON.stringify(header, null, 2)} \n ${JSON.stringify(
          payload,
          null,
          2
        )}`
      );
    } catch (e) {
      console.log(e);
    }
  }, [token]);
  return (
    <div>
      <Row justify="center">
        <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
          <TextArea
            placeholder="text or url"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Divider>JWT Data</Divider>
          <code>{data}</code>
        </Col>
      </Row>
    </div>
  );
}
