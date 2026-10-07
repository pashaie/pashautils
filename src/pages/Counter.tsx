import { Input } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Counter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text === "" ? 0 : text.split(/\n/).length;
    const bytes = new TextEncoder().encode(text).length;
    return { chars, charsNoSpace, words, lines, bytes };
  }, [text]);

  return (
    <div className="tool-panel">
      <PageHeader title="Text Counter" description="Count characters, words, lines, and UTF-8 bytes." />
      <Input.TextArea rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text…" style={{ marginBottom: 16 }} />
      <div className="stats-grid">
        {[
          ["Characters", stats.chars],
          ["No spaces", stats.charsNoSpace],
          ["Words", stats.words],
          ["Lines", stats.lines],
          ["Bytes", stats.bytes],
        ].map(([label, value]) => (
          <div className="stat-card" key={label as string}>
            <div className="stat-card__value">{value as number}</div>
            <div className="stat-card__label">{label as string}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
