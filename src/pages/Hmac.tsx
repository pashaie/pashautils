import { Alert, Col, Input, Row, Select } from "antd";
import CryptoJS from "crypto-js";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const algos = ["SHA256", "SHA1", "SHA512", "MD5"] as const;

export default function Hmac() {
  const [message, setMessage] = useState("hello");
  const [secret, setSecret] = useState("secret");
  const [algo, setAlgo] = useState<(typeof algos)[number]>("SHA256");

  const digest = useMemo(() => {
    const fn = CryptoJS.HmacSHA256;
    const map = {
      SHA256: CryptoJS.HmacSHA256,
      SHA1: CryptoJS.HmacSHA1,
      SHA512: CryptoJS.HmacSHA512,
      MD5: CryptoJS.HmacMD5,
    };
    return map[algo](message, secret).toString();
  }, [message, secret, algo]);

  return (
    <div className="tool-panel">
      <PageHeader title="HMAC" description="Generate HMAC signatures with a shared secret. Computation stays local." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <label className="field-label">Algorithm</label>
          <Select style={{ width: "100%" }} value={algo} onChange={setAlgo} options={algos.map((a) => ({ value: a, label: a }))} />
        </Col>
        <Col span={24}>
          <label className="field-label">Message</label>
          <Input.TextArea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
        </Col>
        <Col span={24}>
          <label className="field-label">Secret</label>
          <Input.Password value={secret} onChange={(e) => setSecret(e.target.value)} />
        </Col>
        <Col span={24}>
          <Alert type="success" showIcon message={digest} action={<CopyButton text={digest} />} />
        </Col>
      </Row>
    </div>
  );
}
