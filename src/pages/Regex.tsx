import { Alert, Checkbox, Col, Input, Row, Space, Tag } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Regex() {
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...text.matchAll(re)].map((m) => ({
        match: m[0],
        index: m.index ?? 0,
        groups: m.slice(1),
      }));
      return { ok: true as const, matches, error: "" };
    } catch (e) {
      return {
        ok: false as const,
        matches: [] as { match: string; index: number; groups: string[] }[],
        error: e instanceof Error ? e.message : "Invalid regex",
      };
    }
  }, [pattern, flags, text]);

  const toggle = (flag: string, on: boolean) => {
    setFlags((f) => {
      const set = new Set(f.split("").filter(Boolean));
      if (on) set.add(flag);
      else set.delete(flag);
      return [...set].join("");
    });
  };

  return (
    <div className="tool-panel">
      <PageHeader title="Regex Tester" description="Test a regular expression against sample text with live matches." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <label className="field-label">Pattern</label>
          <Input value={pattern} onChange={(e) => setPattern(e.target.value)} addonBefore="/" addonAfter={`/${flags}`} />
        </Col>
        <Col xs={24} md={8}>
          <label className="field-label">Flags</label>
          <Space wrap>
            {["g", "i", "m", "s", "u"].map((f) => (
              <Checkbox key={f} checked={flags.includes(f)} onChange={(e) => toggle(f, e.target.checked)}>
                {f}
              </Checkbox>
            ))}
          </Space>
        </Col>
        <Col span={24}>
          <label className="field-label">Test string</label>
          <Input.TextArea rows={6} value={text} onChange={(e) => setText(e.target.value)} />
        </Col>
        <Col span={24}>
          {!result.ok ? (
            <Alert type="error" showIcon message={result.error} />
          ) : (
            <>
              <Alert type="info" showIcon message={`${result.matches.length} match(es)`} style={{ marginBottom: 12 }} />
              <Space wrap>
                {result.matches.map((m, i) => (
                  <Tag key={i} color="blue">
                    [{m.index}] {m.match}
                  </Tag>
                ))}
              </Space>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
