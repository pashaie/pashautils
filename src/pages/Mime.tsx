import { Input, Table } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const MIMES: [string, string][] = [
  [".html", "text/html"], [".css", "text/css"], [".js", "text/javascript"], [".json", "application/json"],
  [".xml", "application/xml"], [".txt", "text/plain"], [".csv", "text/csv"], [".md", "text/markdown"],
  [".png", "image/png"], [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"], [".gif", "image/gif"],
  [".webp", "image/webp"], [".svg", "image/svg+xml"], [".ico", "image/x-icon"],
  [".mp3", "audio/mpeg"], [".wav", "audio/wav"], [".mp4", "video/mp4"], [".webm", "video/webm"],
  [".pdf", "application/pdf"], [".zip", "application/zip"], [".gz", "application/gzip"],
  [".woff", "font/woff"], [".woff2", "font/woff2"], [".ttf", "font/ttf"],
  [".wasm", "application/wasm"], [".bin", "application/octet-stream"],
];

export default function Mime() {
  const [q, setQ] = useState("");
  const data = useMemo(() => {
    const query = q.trim().toLowerCase();
    return MIMES
      .filter(([ext, mime]) => !query || ext.includes(query) || mime.includes(query))
      .map(([ext, mime]) => ({ key: ext, ext, mime }));
  }, [q]);

  return (
    <div className="tool-panel">
      <PageHeader title="MIME Types" description="Look up common file extensions and MIME types." />
      <Input placeholder="Search .png or image/…" value={q} onChange={(e) => setQ(e.target.value)} allowClear style={{ marginBottom: 16 }} />
      <Table size="small" pagination={false} dataSource={data} columns={[
        { title: "Extension", dataIndex: "ext", width: 120 },
        { title: "MIME", dataIndex: "mime" },
      ]} />
    </div>
  );
}
