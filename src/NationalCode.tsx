import {
  Button,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Space,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";

export default function NationalCode() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"" | "error" | "warning" | undefined>(
    ""
  );
  const generateRandomCode = () => {
    setCode(_randomGenerator());
  };
  const generateRoundCode = () => {
    setCode(_roundGenerator());
  };
  useEffect(() => {
    generateRoundCode();
  }, []);

  const updateCode = (val: string): void => {
    setCode(val);
    console.log(validator(val), val);
    if (!validator(val)) {
      setStatus("error");
    } else {
      setStatus("");
    }
  };

  return (
    <div>
      <Row justify="center">
        <Col xs={{ span: 24 }} md={{ span: 18 }}>
          <Space direction="horizontal">
            <Input
              onChange={(e) => updateCode(e.target.value)}
              maxLength={10}
              style={{ minWidth: "120px" }}
              value={code}
              status={status}
              addonAfter={
                <CopyToClipboard text={code}>
                  <Tooltip title="copy">
                    <CopyOutlined />
                  </Tooltip>
                </CopyToClipboard>
              }
            />
            <Button onClick={generateRandomCode}>Generate Random</Button>
            <Button onClick={generateRoundCode}>Generate Round</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

function _randomGenerator() {
  let list = [],
    sum = 0;

  for (let i = 10; i > 1; i--) {
    let j = Math.floor(Math.random() * Math.floor(10));
    list.push(j);
    sum += j * i;
  }

  let s = sum % 11;
  if (s < 2) {
    list.push(s);
  } else if (s >= 2) {
    list.push(11 - s);
  }

  return list.join("");
}

function _roundGenerator(): string {
  let list: any = [],
    sum = 0;
  let j = 10;
  for (let i = 10; i > 1; i--) {
    j = Math.floor(Math.random() * Math.floor(j < 2 ? 2 : j));
    list.push(j);
    sum += j * i;
  }

  let s = sum % 11;
  if (s < 2) {
    list.push(s);
  } else if (s >= 2) {
    list.push(11 - s);
  }
  if (
    list.filter(function (a: any) {
      return a != list[0];
    }).length == 0
  ) {
    return _roundGenerator();
  }
  return list.join("");
}

function validator(val: string) {
  let allDigitEqual = [
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
  if (allDigitEqual.indexOf(val) != -1 || !codeMelliPattern.test(val)) {
    return false;
  }
  let chArray = Array.from(val);
  let num0 = parseInt(chArray[0]) * 10;
  let num2 = parseInt(chArray[1]) * 9;
  let num3 = parseInt(chArray[2]) * 8;
  let num4 = parseInt(chArray[3]) * 7;
  let num5 = parseInt(chArray[4]) * 6;
  let num6 = parseInt(chArray[5]) * 5;
  let num7 = parseInt(chArray[6]) * 4;
  let num8 = parseInt(chArray[7]) * 3;
  let num9 = parseInt(chArray[8]) * 2;
  let a = parseInt(chArray[9]);
  let b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
  let c = b % 11;
  return (c < 2 && a == c) || (c >= 2 && 11 - c == a);
}
