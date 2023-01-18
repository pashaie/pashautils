import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  QRCode,
  Row,
  Slider,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { generate } from "generate-password-browser";
import { CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import hardpass from "hardpass";

export default function Password() {
  const [length, setLength] = useState(20);
  const [config, setConfig] = useState({
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
  });
  const randomPass = generate({
    length,
    // excludeSimilarCharacters: true,
    ...config,
  });
  const updateConfig = (checked: boolean, prop: string) => {
    if (
      Object.keys(config)
        .map((k) => ((config as any)[k] ? 1 : 0))
        .reduce((a: number, c: number) => a + c, 0) === 1 &&
      !checked
    )
      return;
    setConfig({ ...config, [prop]: checked });
  };
  return (
    <div>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
          <Slider
            value={length}
            onChange={(e) => setLength(e)}
            max={100}
            min={6}
          />
          <Checkbox
            checked={config.numbers}
            onChange={(e) => updateConfig(e.target.checked, "numbers")}
          >
            Numbers
          </Checkbox>
          <Checkbox
            checked={config.symbols}
            onChange={(e) => updateConfig(e.target.checked, "symbols")}
          >
            Symbols
          </Checkbox>
          <Checkbox
            checked={config.lowercase}
            onChange={(e) => updateConfig(e.target.checked, "lowercase")}
          >
            Lowercase
          </Checkbox>
          <Checkbox
            checked={config.uppercase}
            onChange={(e) => updateConfig(e.target.checked, "uppercase")}
          >
            Uppercase
          </Checkbox>
          <Divider></Divider>

          <Alert
            message={randomPass}
            type={
              ["error", "error", "warning", "info", "success"][
                (hardpass as any)(randomPass).score
              ] as any
            }
            action={
              <CopyToClipboard text={randomPass}>
                <Tooltip title="copy">
                  <Button icon={<CopyOutlined />} />
                </Tooltip>
              </CopyToClipboard>
            }
          />
          <QRCode value={randomPass}></QRCode>
        </Col>
      </Row>
    </div>
  );
}
