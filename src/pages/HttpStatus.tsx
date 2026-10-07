import { Input, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const STATUSES = [
  [100, "Continue"], [101, "Switching Protocols"],
  [200, "OK"], [201, "Created"], [202, "Accepted"], [204, "No Content"], [206, "Partial Content"],
  [301, "Moved Permanently"], [302, "Found"], [304, "Not Modified"], [307, "Temporary Redirect"], [308, "Permanent Redirect"],
  [400, "Bad Request"], [401, "Unauthorized"], [403, "Forbidden"], [404, "Not Found"], [405, "Method Not Allowed"],
  [408, "Request Timeout"], [409, "Conflict"], [410, "Gone"], [415, "Unsupported Media Type"], [418, "I'm a teapot"],
  [422, "Unprocessable Entity"], [429, "Too Many Requests"],
  [500, "Internal Server Error"], [501, "Not Implemented"], [502, "Bad Gateway"], [503, "Service Unavailable"], [504, "Gateway Timeout"],
] as const;

function color(code: number) {
  if (code < 200) return "default";
  if (code < 300) return "success";
  if (code < 400) return "processing";
  if (code < 500) return "warning";
  return "error";
}

export default function HttpStatus() {
  const [q, setQ] = useState("");
  const data = useMemo(() => {
    const query = q.trim().toLowerCase();
    return STATUSES
      .filter(([code, text]) => !query || String(code).includes(query) || text.toLowerCase().includes(query))
      .map(([code, text]) => ({ key: code, code, text }));
  }, [q]);

  return (
    <div className="tool-panel">
      <PageHeader title="HTTP Status Codes" description="Quick reference for common HTTP response codes." />
      <Input placeholder="Search by code or text…" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 16 }} allowClear />
      <Table
        size="small"
        pagination={false}
        dataSource={data}
        columns={[
          {
            title: "Code",
            dataIndex: "code",
            width: 100,
            render: (c: number) => <Tag color={color(c)}>{c}</Tag>,
          },
          { title: "Meaning", dataIndex: "text" },
        ]}
      />
    </div>
  );
}
