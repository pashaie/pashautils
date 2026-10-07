import { Input, Switch } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Slugify() {
  const [input, setInput] = useState("Hello World — Pasha Utils");
  const [lower, setLower] = useState(true);

  const slug = useMemo(() => {
    let s = input
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (lower) s = s.toLowerCase();
    return s;
  }, [input, lower]);

  return (
    <div className="tool-panel">
      <PageHeader title="Slugify" description="Turn titles into URL-safe slugs." />
      <label className="field-label">Title</label>
      <Input size="large" value={input} onChange={(e) => setInput(e.target.value)} style={{ marginBottom: 12 }} />
      <div style={{ marginBottom: 12 }}>
        <Switch checked={lower} onChange={setLower} /> Lowercase
      </div>
      <div className="length-label">
        <label className="field-label">Slug</label>
        <CopyButton text={slug} />
      </div>
      <Input size="large" value={slug} readOnly />
    </div>
  );
}
