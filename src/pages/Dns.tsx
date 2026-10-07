import { Alert, Button, Input, Select, Space, Table } from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

const TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA"] as const;

export default function Dns() {
  const [name, setName] = useState("example.com");
  const [type, setType] = useState<(typeof TYPES)[number]>("A");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<{ key: string; data: string; ttl: number }[]>([]);

  const lookup = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`;
      const res = await fetch(url, { headers: { Accept: "application/dns-json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const answers = (json.Answer ?? []) as { data: string; TTL: number }[];
      setRows(answers.map((a, i) => ({ key: String(i), data: a.data, ttl: a.TTL })));
      if (!answers.length) setError("No records found");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-panel">
      <PageHeader title="DNS Lookup" description="Resolve DNS records using Cloudflare DNS-over-HTTPS." />
      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="domain.com" onPressEnter={lookup} />
        <Select style={{ width: 120 }} value={type} onChange={setType} options={TYPES.map((t) => ({ value: t, label: t }))} />
        <Button type="primary" loading={loading} onClick={lookup}>Lookup</Button>
      </Space.Compact>
      {error && <Alert type="warning" showIcon message={error} style={{ marginBottom: 12 }} />}
      <Table size="small" pagination={false} dataSource={rows} columns={[
        { title: "Data", dataIndex: "data" },
        { title: "TTL", dataIndex: "ttl", width: 100 },
      ]} />
    </div>
  );
}
