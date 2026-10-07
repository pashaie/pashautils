import {
  Alert,
  Button,
  Checkbox,
  Col,
  Row,
  Slider,
  Space,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { generate } from "generate-password-browser";
import { ReloadOutlined } from "@ant-design/icons";
import { QRCode } from "antd";
import hardpass from "hardpass";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

const { Text } = Typography;

const strengthMap = ["error", "error", "warning", "info", "success"] as const;
const strengthLabel = ["Very weak", "Weak", "Fair", "Good", "Strong"];

export default function Password() {
  const [length, setLength] = useState(20);
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState({
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
  });

  const regenerate = useCallback(() => {
    setPassword(
      generate({
        length,
        ...config,
      })
    );
  }, [length, config]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const updateConfig = (checked: boolean, prop: keyof typeof config) => {
    const enabledCount = Object.values(config).filter(Boolean).length;
    if (enabledCount === 1 && !checked) return;
    setConfig({ ...config, [prop]: checked });
  };

  const score = (hardpass as (p: string) => { score: number })(password).score;
  const alertType = strengthMap[score] ?? "info";

  return (
    <div className="tool-panel">
      <PageHeader
        title="Password Generator"
        description="Tune length and character sets, then copy a strong random password."
        extra={
          <Button icon={<ReloadOutlined />} onClick={regenerate}>
            Regenerate
          </Button>
        }
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <div className="length-label">
            <Text strong>Length</Text>
            <Text type="secondary">{length} characters</Text>
          </div>
          <Slider
            value={length}
            onChange={setLength}
            max={100}
            min={6}
            marks={{ 6: "6", 20: "20", 50: "50", 100: "100" }}
          />
          <div className="option-row">
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
          </div>

          <div className="tool-result">
            <Alert
              message={<span className="password-display">{password}</span>}
              description={`Strength: ${strengthLabel[score] ?? "Unknown"}`}
              type={alertType}
              showIcon
              action={
                <Space>
                  <CopyButton text={password} />
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={regenerate}
                    aria-label="Regenerate"
                  />
                </Space>
              }
            />
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div className="qr-preview">
            <Text type="secondary">Scan to transfer</Text>
            <QRCode value={password || " "} size={160} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
