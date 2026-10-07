import { Alert, Col, Input, Row, Select, Space } from "antd";
import CryptoJS from "crypto-js";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const algos = ["MD5", "SHA1", "SHA256", "SHA512"] as const;

export default function Hash() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState<(typeof algos)[number]>("SHA256");

  const digest = useMemo(() => {
    if (!text) return "";
    switch (algo) {
      case "MD5":
        return CryptoJS.MD5(text).toString();
      case "SHA1":
        return CryptoJS.SHA1(text).toString();
      case "SHA256":
        return CryptoJS.SHA256(text).toString();
      case "SHA512":
        return CryptoJS.SHA512(text).toString();
    }
  }, [text, algo]);

  return (
    <div className="tool-panel">
      <PageHeader
        title="Hash"
        description="Compute common cryptographic digests locally in your browser."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <label className="field-label">Algorithm</label>
          <Select
            style={{ width: "100%" }}
            value={algo}
            onChange={setAlgo}
            options={algos.map((a) => ({ value: a, label: a }))}
          />
        </Col>
        <Col span={24}>
          <label className="field-label">Input</label>
          <Input.TextArea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text to hash…"
          />
        </Col>
        <Col span={24}>
          <Alert
            type="success"
            showIcon
            message={digest || "Hash will appear here"}
            action={
              <Space>
                <CopyButton text={digest} />
              </Space>
            }
          />
        </Col>
      </Row>
    </div>
  );
}
