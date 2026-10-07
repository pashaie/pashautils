import { Alert, Button, Descriptions, Input } from "antd";
import { UAParser } from "ua-parser-js";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function UserAgent() {
  const [ua, setUa] = useState(() => navigator.userAgent);
  const parsed = useMemo(() => new UAParser(ua).getResult(), [ua]);

  return (
    <div className="tool-panel">
      <PageHeader title="User-Agent Parser" description="Break down a User-Agent string into browser, OS, and device." />
      <label className="field-label">User-Agent</label>
      <Input.TextArea rows={4} value={ua} onChange={(e) => setUa(e.target.value)} style={{ marginBottom: 8 }} />
      <Button style={{ marginBottom: 16 }} onClick={() => setUa(navigator.userAgent)}>Use this browser</Button>
      {!ua.trim() ? (
        <Alert type="info" message="Paste a User-Agent string" />
      ) : (
        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="Browser">{[parsed.browser.name, parsed.browser.version].filter(Boolean).join(" ") || "—"}</Descriptions.Item>
          <Descriptions.Item label="Engine">{[parsed.engine.name, parsed.engine.version].filter(Boolean).join(" ") || "—"}</Descriptions.Item>
          <Descriptions.Item label="OS">{[parsed.os.name, parsed.os.version].filter(Boolean).join(" ") || "—"}</Descriptions.Item>
          <Descriptions.Item label="Device">{[parsed.device.vendor, parsed.device.model, parsed.device.type].filter(Boolean).join(" ") || "—"}</Descriptions.Item>
          <Descriptions.Item label="CPU">{parsed.cpu.architecture || "—"}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
}
