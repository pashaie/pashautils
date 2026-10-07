import { Button, Col, Input, InputNumber, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

function nanoId(size = 21) {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export default function Uuid() {
  const [uuid, setUuid] = useState(() => crypto.randomUUID());
  const [nano, setNano] = useState(() => nanoId());
  const [nanoLen, setNanoLen] = useState(21);
  const [bulk, setBulk] = useState("");

  const genBulk = (n: number) => {
    setBulk(Array.from({ length: n }, () => crypto.randomUUID()).join("\n"));
  };

  return (
    <div className="tool-panel">
      <PageHeader
        title="UUID / NanoID"
        description="Generate RFC 4122 UUIDs or short URL-friendly NanoIDs."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">UUID v4</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input value={uuid} readOnly />
            <CopyButton text={uuid} />
            <Button type="primary" onClick={() => setUuid(crypto.randomUUID())}>
              New
            </Button>
          </Space.Compact>
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">NanoID (length {nanoLen})</label>
          <Space wrap style={{ width: "100%", marginBottom: 8 }}>
            <InputNumber min={4} max={64} value={nanoLen} onChange={(v) => setNanoLen(v || 21)} />
            <Button
              type="primary"
              onClick={() => setNano(nanoId(nanoLen))}
            >
              New
            </Button>
            <CopyButton text={nano} />
          </Space>
          <Input value={nano} readOnly />
        </Col>
        <Col span={24}>
          <label className="field-label">Bulk UUIDs</label>
          <Space style={{ marginBottom: 8 }}>
            <Button onClick={() => genBulk(10)}>10</Button>
            <Button onClick={() => genBulk(50)}>50</Button>
            <CopyButton text={bulk} label="Copy all" />
          </Space>
          <Input.TextArea rows={8} value={bulk} readOnly placeholder="Generate a batch…" />
        </Col>
      </Row>
    </div>
  );
}
