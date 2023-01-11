import { Col, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

export default function Base64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");

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
    </div>
  );
}
