import {
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  Row,
  Slider,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { generate } from "generate-password-browser";
import { passwordStrength } from "check-password-strength";
import { CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Password() {
  const [length, setLength] = useState(20);
  const [config, setConfig] = useState({
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
  });
  const p = generate({
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
        <Col span={12} offset={6}>
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
          {passwordStrength(p).value}

          <Input.Group compact>
            <Input style={{ width: "calc(100% - 200px)" }} value={p} readOnly />

            <CopyToClipboard text={p}>
              <Tooltip title="copy">
                <Button icon={<CopyOutlined />} />
              </Tooltip>
            </CopyToClipboard>
          </Input.Group>
        </Col>
      </Row>
    </div>
  );
}
