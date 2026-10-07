import { Col, InputNumber, Row, Select } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

type Category = "bytes" | "length" | "mass" | "temp";

const units: Record<Category, { label: string; toBase: (n: number) => number; fromBase: (n: number) => number }[]> = {
  bytes: [
    { label: "B", toBase: (n) => n, fromBase: (n) => n },
    { label: "KB", toBase: (n) => n * 1024, fromBase: (n) => n / 1024 },
    { label: "MB", toBase: (n) => n * 1024 ** 2, fromBase: (n) => n / 1024 ** 2 },
    { label: "GB", toBase: (n) => n * 1024 ** 3, fromBase: (n) => n / 1024 ** 3 },
  ],
  length: [
    { label: "m", toBase: (n) => n, fromBase: (n) => n },
    { label: "km", toBase: (n) => n * 1000, fromBase: (n) => n / 1000 },
    { label: "cm", toBase: (n) => n / 100, fromBase: (n) => n * 100 },
    { label: "ft", toBase: (n) => n * 0.3048, fromBase: (n) => n / 0.3048 },
    { label: "mi", toBase: (n) => n * 1609.344, fromBase: (n) => n / 1609.344 },
  ],
  mass: [
    { label: "kg", toBase: (n) => n, fromBase: (n) => n },
    { label: "g", toBase: (n) => n / 1000, fromBase: (n) => n * 1000 },
    { label: "lb", toBase: (n) => n * 0.45359237, fromBase: (n) => n / 0.45359237 },
  ],
  temp: [
    { label: "C", toBase: (n) => n, fromBase: (n) => n },
    { label: "F", toBase: (n) => (n - 32) * (5 / 9), fromBase: (n) => n * (9 / 5) + 32 },
    { label: "K", toBase: (n) => n - 273.15, fromBase: (n) => n + 273.15 },
  ],
};

export default function Units() {
  const [cat, setCat] = useState<Category>("bytes");
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(2);
  const [value, setValue] = useState(1);

  const list = units[cat];
  const result = useMemo(() => {
    const base = list[fromIdx].toBase(value || 0);
    return list[toIdx].fromBase(base);
  }, [list, fromIdx, toIdx, value]);

  return (
    <div className="tool-panel">
      <PageHeader title="Unit Converter" description="Convert bytes, length, mass, and temperature units." />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            style={{ width: 200 }}
            value={cat}
            onChange={(c) => {
              setCat(c);
              setFromIdx(0);
              setToIdx(1);
            }}
            options={[
              { value: "bytes", label: "Data size" },
              { value: "length", label: "Length" },
              { value: "mass", label: "Mass" },
              { value: "temp", label: "Temperature" },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <label className="field-label">Value</label>
          <InputNumber style={{ width: "100%" }} value={value} onChange={(v) => setValue(Number(v) || 0)} />
        </Col>
        <Col xs={12} md={8}>
          <label className="field-label">From</label>
          <Select style={{ width: "100%" }} value={fromIdx} onChange={setFromIdx} options={list.map((u, i) => ({ value: i, label: u.label }))} />
        </Col>
        <Col xs={12} md={8}>
          <label className="field-label">To</label>
          <Select style={{ width: "100%" }} value={toIdx} onChange={setToIdx} options={list.map((u, i) => ({ value: i, label: u.label }))} />
        </Col>
        <Col span={24}>
          <div className="stat-card">
            <div className="stat-card__value">{Number(result.toPrecision(10))}</div>
            <div className="stat-card__label">{list[toIdx].label}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
