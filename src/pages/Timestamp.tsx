import { Button, Col, DatePicker, Input, Row, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Timestamp() {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const [unix, setUnix] = useState(String(Math.floor(Date.now() / 1000)));
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const fromUnix = (val: string) => {
    setUnix(val);
    const n = Number(val);
    if (!Number.isFinite(n)) return;
    const ms = Math.abs(n) < 1e12 ? n * 1000 : n;
    setDate(dayjs(ms));
  };

  const fromDate = (d: Dayjs | null) => {
    setDate(d);
    if (d) setUnix(String(d.unix()));
  };

  return (
    <div className="tool-panel">
      <PageHeader title="Timestamp" description="Convert between Unix timestamps and human-readable dates." />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="stat-card" style={{ display: "inline-block", minWidth: 220 }}>
            <div className="stat-card__label">Now (seconds)</div>
            <div className="stat-card__value">{now}</div>
            <CopyButton text={String(now)} label="Copy" />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Unix timestamp</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input value={unix} onChange={(e) => fromUnix(e.target.value)} />
            <Button onClick={() => fromUnix(String(now))}>Now</Button>
          </Space.Compact>
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Date</label>
          <DatePicker
            showTime
            style={{ width: "100%" }}
            value={date}
            onChange={fromDate}
          />
        </Col>
        <Col span={24}>
          <Input
            readOnly
            value={date ? date.toISOString() : ""}
            addonBefore="ISO"
            addonAfter={<CopyButton text={date ? date.toISOString() : ""} />}
          />
        </Col>
      </Row>
    </div>
  );
}
