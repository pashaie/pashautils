import { Alert, Button, Col, Input, InputNumber, Row, Space } from "antd";
import bcrypt from "bcryptjs";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Bcrypt() {
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState("");
  const [check, setCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<boolean | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const salt = await bcrypt.genSalt(rounds);
      setHash(await bcrypt.hash(password, salt));
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setMatch(await bcrypt.compare(check || password, hash));
  };

  return (
    <div className="tool-panel">
      <PageHeader title="Bcrypt" description="Hash and verify passwords with bcrypt. Higher rounds are slower." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <label className="field-label">Password</label>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Col>
        <Col xs={24} md={8}>
          <label className="field-label">Rounds</label>
          <InputNumber min={4} max={15} value={rounds} onChange={(v) => setRounds(v || 10)} style={{ width: "100%" }} />
        </Col>
        <Col span={24}>
          <Space>
            <Button type="primary" loading={loading} onClick={generate}>Hash</Button>
            <CopyButton text={hash} label="Copy hash" />
          </Space>
        </Col>
        <Col span={24}>
          <Alert type="info" showIcon message={hash || "Hash will appear here"} />
        </Col>
        <Col span={24}>
          <label className="field-label">Verify against hash</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input.Password value={check} onChange={(e) => setCheck(e.target.value)} placeholder="Password to check" />
            <Button onClick={verify}>Verify</Button>
          </Space.Compact>
          {match !== null && (
            <Alert style={{ marginTop: 12 }} type={match ? "success" : "error"} showIcon message={match ? "Match" : "No match"} />
          )}
        </Col>
      </Row>
    </div>
  );
}
