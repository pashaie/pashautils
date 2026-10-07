import { Alert, Input } from "antd";
import cronstrue from "cronstrue";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Cron() {
  const [expr, setExpr] = useState("*/5 * * * *");
  const explained = useMemo(() => {
    try {
      return { ok: true as const, text: cronstrue.toString(expr) };
    } catch (e) {
      return { ok: false as const, text: e instanceof Error ? e.message : "Invalid cron" };
    }
  }, [expr]);

  return (
    <div className="tool-panel">
      <PageHeader title="Cron Explainer" description="Translate a cron expression into plain English." />
      <label className="field-label">Expression</label>
      <Input size="large" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="*/5 * * * *" style={{ marginBottom: 16 }} />
      <Alert
        type={explained.ok ? "success" : "error"}
        showIcon
        message={explained.text}
      />
    </div>
  );
}
