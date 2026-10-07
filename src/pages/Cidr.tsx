import { Alert, Descriptions, Input } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

function ipToInt(ip: string) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => p < 0 || p > 255 || Number.isNaN(p))) {
    throw new Error("Invalid IPv4");
  }
  return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

function intToIp(n: number) {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

function parseCidr(input: string) {
  const [ip, prefixRaw] = input.trim().split("/");
  const prefix = Number(prefixRaw);
  if (!ip || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new Error("Use CIDR like 192.168.1.0/24");
  }
  const ipInt = ipToInt(ip);
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const size = 2 ** (32 - prefix);
  const first = prefix === 32 ? network : network + 1;
  const last = prefix >= 31 ? broadcast : broadcast - 1;
  return {
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    netmask: intToIp(mask),
    wildcard: intToIp(~mask >>> 0),
    hosts: Math.max(size - (prefix >= 31 ? 0 : 2), size === 1 ? 1 : size - 2),
    first: intToIp(first >>> 0),
    last: intToIp(last >>> 0),
    prefix,
  };
}

export default function Cidr() {
  const [input, setInput] = useState("192.168.1.0/24");
  const result = useMemo(() => {
    try {
      return { ok: true as const, data: parseCidr(input) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Invalid" };
    }
  }, [input]);

  return (
    <div className="tool-panel">
      <PageHeader title="IP / CIDR Calculator" description="Calculate network, broadcast, and host range for an IPv4 CIDR." />
      <label className="field-label">CIDR</label>
      <Input size="large" value={input} onChange={(e) => setInput(e.target.value)} style={{ marginBottom: 16 }} />
      {!result.ok ? (
        <Alert type="error" showIcon message={result.error} />
      ) : (
        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="Network">{result.data.network}/{result.data.prefix}</Descriptions.Item>
          <Descriptions.Item label="Netmask">{result.data.netmask}</Descriptions.Item>
          <Descriptions.Item label="Wildcard">{result.data.wildcard}</Descriptions.Item>
          <Descriptions.Item label="Broadcast">{result.data.broadcast}</Descriptions.Item>
          <Descriptions.Item label="Host range">{result.data.first} — {result.data.last}</Descriptions.Item>
          <Descriptions.Item label="Usable hosts">{result.data.hosts}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
}
