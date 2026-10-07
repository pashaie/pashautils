import { Alert, Input } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Postal() {
  const [value, setValue] = useState("");
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const valid = useMemo(() => /^\d{10}$/.test(digits) && !/^(\d)\1{9}$/.test(digits), [digits]);

  return (
    <div className="tool-panel">
      <PageHeader title="Postal Code" description="Basic validation for Iranian 10-digit postal codes." />
      <label className="field-label">Postal code</label>
      <Input size="large" value={digits} onChange={(e) => setValue(e.target.value)} placeholder="10 digits" style={{ marginBottom: 16 }} />
      {digits ? (
        <Alert
          type={valid ? "success" : digits.length < 10 ? "info" : "error"}
          showIcon
          message={
            valid
              ? "Looks valid"
              : digits.length < 10
                ? `${10 - digits.length} digit(s) remaining`
                : "Invalid postal code"
          }
        />
      ) : (
        <Alert type="info" showIcon message="Enter a 10-digit code" />
      )}
    </div>
  );
}
