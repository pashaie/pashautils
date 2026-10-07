import { Alert, Button, Col, Input, Row, Space } from "antd";
import CryptoJS from "crypto-js";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Aes() {
  const [plain, setPlain] = useState("sensitive text");
  const [secret, setSecret] = useState("change-me");
  const [cipher, setCipher] = useState("");
  const [error, setError] = useState("");

  const encrypt = () => {
    try {
      setCipher(CryptoJS.AES.encrypt(plain, secret).toString());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encrypt failed");
    }
  };

  const decrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, secret);
      const text = bytes.toString(CryptoJS.enc.Utf8);
      if (!text) throw new Error("Wrong key or invalid ciphertext");
      setPlain(text);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decrypt failed");
    }
  };

  return (
    <div>
      <PageHeader
        title="AES Encrypt / Decrypt"
        description="Demo AES helper via CryptoJS. Do not use for production secrets without a proper KDF and protocol."
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <label className="field-label">Passphrase</label>
          <Input.Password value={secret} onChange={(e) => setSecret(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Plain text</label>
          <Input.TextArea rows={8} value={plain} onChange={(e) => setPlain(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Cipher text</label>
          <Input.TextArea rows={8} value={cipher} onChange={(e) => setCipher(e.target.value)} />
        </Col>
        <Col span={24}>
          <Space wrap>
            <Button type="primary" onClick={encrypt}>Encrypt</Button>
            <Button onClick={decrypt}>Decrypt</Button>
            <CopyButton text={cipher} label="Copy cipher" />
          </Space>
          {error && <Alert style={{ marginTop: 12 }} type="error" showIcon message={error} />}
        </Col>
      </Row>
    </div>
  );
}
