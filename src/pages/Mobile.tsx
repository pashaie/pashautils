import { Alert, Input } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const re = /^(?:\+98|0098|98|0)?9\d{9}$/;

export default function Mobile() {
  const [value, setValue] = useState("");
  const normalized = value.replace(/[\s-]/g, "");
  const valid = useMemo(() => re.test(normalized), [normalized]);
  const local = normalized.replace(/^(?:\+98|0098|98)/, "0").replace(/^9/, "09");

  return (
    <div className="tool-panel">
      <PageHeader title="Mobile Number" description="Validate Iranian mobile numbers (+98 / 09…)." />
      <label className="field-label">Number</label>
      <Input size="large" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0912… or +98912…" style={{ marginBottom: 16 }} />
      {value ? (
        <Alert
          type={valid ? "success" : "error"}
          showIcon
          message={valid ? "Valid Iranian mobile" : "Invalid format"}
          description={valid ? `Normalized: ${local}` : "Expected 09xxxxxxxxx"}
        />
      ) : (
        <Alert type="info" showIcon message="Enter a mobile number" />
      )}
    </div>
  );
}
