import { Alert, Button, Input, Space } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Whois() {
  const [domain, setDomain] = useState("example.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const lookup = async () => {
    setLoading(true);
    setError("");
    setData("");
    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain.trim())}`);
      if (!res.ok) throw new Error(`RDAP returned HTTP ${res.status}`);
      const json = await res.json();
      setData(JSON.stringify(json, null, 2));
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message}. RDAP may block browser CORS for some TLDs.`
          : "Lookup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-panel">
      <PageHeader title="WHOIS / RDAP" description="Fetch domain registration data via the public RDAP bootstrap service." />
      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} onPressEnter={lookup} />
        <Button type="primary" loading={loading} onClick={lookup}>Lookup</Button>
        <CopyButton text={data} label="Copy" />
      </Space.Compact>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} />}
      <code className={`jwt-output ${data ? "" : "jwt-output--empty"}`}>
        {data || "RDAP JSON will appear here"}
      </code>
    </div>
  );
}
