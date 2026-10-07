import { Alert, Input, Progress } from "antd";
import hardpass from "hardpass";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const colors = ["#ff4d4f", "#ff7a45", "#faad14", "#1677ff", "#52c41a"];

export default function Strength() {
  const [password, setPassword] = useState("");
  const score = useMemo(() => {
    if (!password) return -1;
    return (hardpass as (p: string) => { score: number })(password).score;
  }, [password]);

  return (
    <div className="tool-panel">
      <PageHeader title="Password Strength" description="Score an existing password. Nothing is stored or sent anywhere." />
      <label className="field-label">Password</label>
      <Input.Password
        size="large"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a password to evaluate"
        style={{ marginBottom: 16 }}
      />
      {score >= 0 ? (
        <>
          <Progress percent={(score + 1) * 20} strokeColor={colors[score]} showInfo={false} />
          <Alert
            style={{ marginTop: 12 }}
            type={(["error", "error", "warning", "info", "success"] as const)[score]}
            showIcon
            message={labels[score]}
            description={`${password.length} characters`}
          />
        </>
      ) : (
        <Alert type="info" showIcon message="Start typing to see a strength score" />
      )}
    </div>
  );
}
