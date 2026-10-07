import { Checkbox, Col, Input, Row, Space } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

type Perms = { r: boolean; w: boolean; x: boolean };
const empty: Perms = { r: false, w: false, x: false };

function digit(p: Perms) {
  return (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
}

function fromDigit(n: number): Perms {
  return { r: !!(n & 4), w: !!(n & 2), x: !!(n & 1) };
}

function symbolic(u: Perms, g: Perms, o: Perms) {
  const s = (p: Perms) => `${p.r ? "r" : "-"}${p.w ? "w" : "-"}${p.x ? "x" : "-"}`;
  return s(u) + s(g) + s(o);
}

export default function Chmod() {
  const [owner, setOwner] = useState<Perms>({ r: true, w: true, x: true });
  const [group, setGroup] = useState<Perms>({ r: true, w: false, x: true });
  const [other, setOther] = useState<Perms>({ r: true, w: false, x: true });

  const octal = useMemo(
    () => `${digit(owner)}${digit(group)}${digit(other)}`,
    [owner, group, other]
  );
  const sym = useMemo(() => symbolic(owner, group, other), [owner, group, other]);

  const setOctal = (raw: string) => {
    const m = raw.replace(/\D/g, "").slice(0, 3);
    if (m.length !== 3) return;
    setOwner(fromDigit(Number(m[0])));
    setGroup(fromDigit(Number(m[1])));
    setOther(fromDigit(Number(m[2])));
  };

  const renderGroup = (title: string, value: Perms, set: (p: Perms) => void) => (
    <Col xs={24} md={8}>
      <label className="field-label">{title}</label>
      <Space>
        {(["r", "w", "x"] as const).map((k) => (
          <Checkbox
            key={k}
            checked={value[k]}
            onChange={(e) => set({ ...value, [k]: e.target.checked })}
          >
            {k}
          </Checkbox>
        ))}
      </Space>
    </Col>
  );

  return (
    <div className="tool-panel">
      <PageHeader title="Chmod Calculator" description="Convert between symbolic and octal Unix permissions." />
      <Row gutter={[16, 16]}>
        {renderGroup("Owner", owner, setOwner)}
        {renderGroup("Group", group, setGroup)}
        {renderGroup("Other", other, setOther)}
        <Col xs={24} md={12}>
          <div className="length-label">
            <label className="field-label">Octal</label>
            <CopyButton text={octal} />
          </div>
          <Input size="large" value={octal} onChange={(e) => setOctal(e.target.value)} />
        </Col>
        <Col xs={24} md={12}>
          <div className="length-label">
            <label className="field-label">Symbolic</label>
            <CopyButton text={sym} />
          </div>
          <Input size="large" value={sym} readOnly />
        </Col>
        <Col span={24}>
          <Input addonBefore="chmod" value={`${octal} path`} readOnly addonAfter={<CopyButton text={`chmod ${octal}`} />} />
        </Col>
      </Row>
    </div>
  );
}
