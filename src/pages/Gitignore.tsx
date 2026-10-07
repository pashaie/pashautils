import { Button, Checkbox, Col, Input, Row, Space } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const TEMPLATES: Record<string, string> = {
  Node: `node_modules/\ndist/\nbuild/\n.env\n*.log\n.DS_Store\n`,
  Python: `__pycache__/\n*.py[cod]\n.venv/\nvenv/\n.env\n*.egg-info/\n.pytest_cache/\n`,
  Go: `bin/\n*.exe\n*.test\nvendor/\n`,
  Rust: `/target/\n**/*.rs.bk\nCargo.lock\n`,
  Java: `*.class\ntarget/\n.idea/\n*.iml\n`,
  Dotnet: `bin/\nobj/\n*.user\n.vs/\n`,
  macOS: `.DS_Store\n.AppleDouble\n.LSOverride\n`,
  Windows: `Thumbs.db\nDesktop.ini\n$RECYCLE.BIN/\n`,
  Vite: `node_modules/\ndist/\n.vite/\n*.local\n`,
};

export default function Gitignore() {
  const [selected, setSelected] = useState<string[]>(["Node", "macOS"]);
  const [extra, setExtra] = useState("");

  const output = useMemo(() => {
    const blocks = selected.map((name) => `# ${name}\n${TEMPLATES[name].trim()}`);
    if (extra.trim()) blocks.push(`# Custom\n${extra.trim()}`);
    return blocks.join("\n\n") + "\n";
  }, [selected, extra]);

  return (
    <div className="tool-panel">
      <PageHeader title=".gitignore Generator" description="Combine common ignore templates into one file." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <label className="field-label">Templates</label>
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
            options={Object.keys(TEMPLATES)}
            value={selected}
            onChange={(v) => setSelected(v as string[])}
          />
          <label className="field-label" style={{ marginTop: 16 }}>Custom lines</label>
          <Input.TextArea rows={4} value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="coverage/&#10;tmp/" />
        </Col>
        <Col xs={24} md={14}>
          <div className="length-label">
            <label className="field-label">.gitignore</label>
            <Space>
              <CopyButton text={output} label="Copy" />
              <Button onClick={() => {
                const blob = new Blob([output], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = ".gitignore";
                a.click();
                URL.revokeObjectURL(url);
              }}>Download</Button>
            </Space>
          </div>
          <Input.TextArea rows={18} value={output} readOnly />
        </Col>
      </Row>
    </div>
  );
}
