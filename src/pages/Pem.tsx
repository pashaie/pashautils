import { Alert, Descriptions, Input } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

function inspectPem(pem: string) {
  const blocks = [...pem.matchAll(/-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/g)];
  if (!blocks.length) throw new Error("No PEM blocks found");
  return blocks.map((m, i) => {
    const type = m[1].trim();
    const b64 = m[2].replace(/\s+/g, "");
    const bytes = Math.floor(b64.length * 0.75);
    return {
      key: String(i),
      type,
      bytes,
      lines: m[0].split("\n").length,
      base64Length: b64.length,
    };
  });
}

export default function Pem() {
  const [pem, setPem] = useState(
    "-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n-----END CERTIFICATE-----\n"
  );

  const result = useMemo(() => {
    try {
      return { ok: true as const, blocks: inspectPem(pem) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Invalid PEM" };
    }
  }, [pem]);

  return (
    <div className="tool-panel">
      <PageHeader
        title="PEM Inspector"
        description="Detect PEM block types and sizes. Full X.509 parsing is not performed in-browser."
      />
      <label className="field-label">PEM</label>
      <Input.TextArea rows={10} value={pem} onChange={(e) => setPem(e.target.value)} style={{ marginBottom: 16 }} />
      {!result.ok ? (
        <Alert type="error" showIcon message={result.error} />
      ) : (
        result.blocks.map((b) => (
          <Descriptions key={b.key} bordered size="small" column={1} style={{ marginBottom: 12 }} title={b.type}>
            <Descriptions.Item label="Approx. bytes">{b.bytes}</Descriptions.Item>
            <Descriptions.Item label="Base64 length">{b.base64Length}</Descriptions.Item>
            <Descriptions.Item label="Lines">{b.lines}</Descriptions.Item>
          </Descriptions>
        ))
      )}
    </div>
  );
}
