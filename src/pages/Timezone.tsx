import { Col, DatePicker, Row, Select, Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

dayjs.extend(utc);
dayjs.extend(timezone);

const ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tehran",
  "Asia/Dubai",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export default function Timezone() {
  const [base, setBase] = useState("Asia/Tehran");
  const [when, setWhen] = useState<Dayjs>(() => dayjs());

  const rows = useMemo(
    () =>
      ZONES.map((z) => ({
        key: z,
        zone: z,
        time: dayjs(when).tz(base).tz(z).format("YYYY-MM-DD HH:mm:ss z"),
      })),
    [base, when]
  );

  return (
    <div className="tool-panel">
      <PageHeader title="Timezone Converter" description="See the same instant across common timezones." />
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <label className="field-label">Base timezone</label>
          <Select style={{ width: "100%" }} value={base} onChange={setBase} options={ZONES.map((z) => ({ value: z, label: z }))} />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Local time in base zone</label>
          <DatePicker showTime style={{ width: "100%" }} value={when} onChange={(d) => d && setWhen(d)} />
        </Col>
      </Row>
      <Table size="small" pagination={false} dataSource={rows} columns={[
        { title: "Timezone", dataIndex: "zone" },
        { title: "Time", dataIndex: "time" },
      ]} />
    </div>
  );
}
