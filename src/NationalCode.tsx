import { Alert, Button, Col, Input, Row, Space, Tooltip, Typography, message } from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import PageHeader from "./components/PageHeader";

const { Text } = Typography;

export default function NationalCode() {
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState(false);

  const generateRandomCode = () => {
    setTouched(true);
    setCode(_randomGenerator());
  };

  const generateRoundCode = () => {
    setTouched(true);
    setCode(_roundGenerator());
  };

  useEffect(() => {
    generateRoundCode();
  }, []);

  const updateCode = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setTouched(true);
    setCode(digits);
  };

  const isValid = code.length === 10 && validator(code);
  const status =
    !touched || code.length === 0
      ? undefined
      : isValid
        ? undefined
        : ("error" as const);

  return (
    <div className="tool-panel">
      <PageHeader
        title="National Code"
        description="Validate an Iranian national ID, or generate a valid random / round code for testing."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <label className="field-label">National code</label>
          <Input
            size="large"
            onChange={(e) => updateCode(e.target.value)}
            maxLength={10}
            value={code}
            status={status}
            placeholder="10-digit code"
            suffix={
              <CopyToClipboard
                text={code}
                onCopy={() => message.success("Copied to clipboard")}
              >
                <Tooltip title="Copy">
                  <CopyOutlined
                    style={{ cursor: code ? "pointer" : "default", opacity: code ? 1 : 0.35 }}
                  />
                </Tooltip>
              </CopyToClipboard>
            }
          />
          <Space wrap style={{ marginTop: 16 }}>
            <Button type="primary" onClick={generateRandomCode}>
              Generate random
            </Button>
            <Button onClick={generateRoundCode}>Generate round</Button>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          {code.length > 0 && (
            <Alert
              type={isValid ? "success" : code.length < 10 ? "info" : "error"}
              showIcon
              icon={
                isValid ? <CheckCircleOutlined /> : <CloseCircleOutlined />
              }
              message={
                isValid
                  ? "Valid national code"
                  : code.length < 10
                    ? `${10 - code.length} digit(s) remaining`
                    : "Invalid national code"
              }
              description={
                <Text type="secondary">
                  Checksum and format are verified against the official rules.
                </Text>
              }
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

function _randomGenerator() {
  const list: number[] = [];
  let sum = 0;

  for (let i = 10; i > 1; i--) {
    const j = Math.floor(Math.random() * 10);
    list.push(j);
    sum += j * i;
  }

  const s = sum % 11;
  list.push(s < 2 ? s : 11 - s);
  return list.join("");
}

function _roundGenerator(): string {
  const list: number[] = [];
  let sum = 0;
  let j = 10;
  for (let i = 10; i > 1; i--) {
    j = Math.floor(Math.random() * (j < 2 ? 2 : j));
    list.push(j);
    sum += j * i;
  }

  const s = sum % 11;
  list.push(s < 2 ? s : 11 - s);
  if (list.every((a) => a === list[0])) {
    return _roundGenerator();
  }
  return list.join("");
}

function validator(val: string) {
  const allDigitEqual = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ];
  const codeMelliPattern = /^([0-9]{10})+$/;
  if (allDigitEqual.indexOf(val) !== -1 || !codeMelliPattern.test(val)) {
    return false;
  }
  const chArray = Array.from(val);
  const num0 = parseInt(chArray[0]) * 10;
  const num2 = parseInt(chArray[1]) * 9;
  const num3 = parseInt(chArray[2]) * 8;
  const num4 = parseInt(chArray[3]) * 7;
  const num5 = parseInt(chArray[4]) * 6;
  const num6 = parseInt(chArray[5]) * 5;
  const num7 = parseInt(chArray[6]) * 4;
  const num8 = parseInt(chArray[7]) * 3;
  const num9 = parseInt(chArray[8]) * 2;
  const a = parseInt(chArray[9]);
  const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
  const c = b % 11;
  return (c < 2 && a === c) || (c >= 2 && 11 - c === a);
}
