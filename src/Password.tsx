import { Checkbox, Col, Row, Slider } from "antd";
import React from "react";
import { generate } from "generate-password-browser";

export default function Password() {
  const p = generate();
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Slider defaultValue={20} max={100} min={6} />
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
        </Col>
      </Row>
    </div>
  );
}
