import { Alert, Col, InputNumber, Row, Select, Typography } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const { Text } = Typography;

type TemporalPlainDate = {
  year: number;
  month: number;
  day: number;
  daysInMonth: number;
  withCalendar(calendar: string): TemporalPlainDate;
  toString(): string;
};

type TemporalApi = {
  Now: { plainDateISO(): TemporalPlainDate };
  PlainDate: {
    from(item: {
      year: number;
      month: number;
      day: number;
      calendar?: string;
    }): TemporalPlainDate;
  };
};

function getTemporal(): TemporalApi | undefined {
  return (globalThis as { Temporal?: TemporalApi }).Temporal;
}

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const GREGORIAN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function clampDay(year: number, month: number, day: number, calendar: string) {
  const Temporal = getTemporal();
  if (!Temporal) return day;
  try {
    const days = Temporal.PlainDate.from({
      year,
      month,
      day: 1,
      calendar,
    }).daysInMonth;
    return Math.min(Math.max(1, day), days);
  } catch {
    return day;
  }
}

export default function Jalali() {
  const Temporal = getTemporal();

  const initial = useMemo(() => {
    if (!Temporal) return null;
    const iso = Temporal.Now.plainDateISO();
    const persian = iso.withCalendar("persian");
    return {
      gy: iso.year,
      gm: iso.month,
      gd: iso.day,
      jy: persian.year,
      jm: persian.month,
      jd: persian.day,
    };
  }, [Temporal]);

  const [gy, setGy] = useState(initial?.gy ?? 2026);
  const [gm, setGm] = useState(initial?.gm ?? 1);
  const [gd, setGd] = useState(initial?.gd ?? 1);
  const [jy, setJy] = useState(initial?.jy ?? 1404);
  const [jm, setJm] = useState(initial?.jm ?? 1);
  const [jd, setJd] = useState(initial?.jd ?? 1);
  const [error, setError] = useState("");

  if (!Temporal) {
    return (
      <div className="tool-panel">
        <PageHeader
          title="Jalali Date"
          description="Convert between Gregorian and Jalali using the browser Temporal API."
        />
        <Alert
          type="warning"
          showIcon
          message="Temporal API is not available in this browser"
          description="Use a recent Chrome, Edge, Firefox, or Safari build with Temporal enabled."
        />
      </div>
    );
  }

  const syncFromGregorian = (y: number, m: number, d: number) => {
    try {
      const day = clampDay(y, m, d, "iso8601");
      const iso = Temporal.PlainDate.from({ year: y, month: m, day, calendar: "iso8601" });
      const persian = iso.withCalendar("persian");
      setGy(iso.year);
      setGm(iso.month);
      setGd(iso.day);
      setJy(persian.year);
      setJm(persian.month);
      setJd(persian.day);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid Gregorian date");
    }
  };

  const syncFromJalali = (y: number, m: number, d: number) => {
    try {
      const day = clampDay(y, m, d, "persian");
      const persian = Temporal.PlainDate.from({
        year: y,
        month: m,
        day,
        calendar: "persian",
      });
      const iso = persian.withCalendar("iso8601");
      setJy(persian.year);
      setJm(persian.month);
      setJd(persian.day);
      setGy(iso.year);
      setGm(iso.month);
      setGd(iso.day);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid Jalali date");
    }
  };

  const gregorianStr = `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
  const jalaliStr = `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;

  const gDays = Temporal.PlainDate.from({
    year: gy,
    month: gm,
    day: 1,
    calendar: "iso8601",
  }).daysInMonth;
  const jDays = Temporal.PlainDate.from({
    year: jy,
    month: jm,
    day: 1,
    calendar: "persian",
  }).daysInMonth;

  return (
    <div className="tool-panel">
      <PageHeader
        title="Jalali Date"
        description="Convert Gregorian ↔ Jalali with the browser Temporal API (calendar: persian)."
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Text strong>Gregorian (ISO)</Text>
          <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
            <Col span={8}>
              <label className="field-label">Year</label>
              <InputNumber
                style={{ width: "100%" }}
                value={gy}
                onChange={(v) => syncFromGregorian(v || gy, gm, gd)}
              />
            </Col>
            <Col span={10}>
              <label className="field-label">Month</label>
              <Select
                style={{ width: "100%" }}
                value={gm}
                onChange={(m) => syncFromGregorian(gy, m, gd)}
                options={GREGORIAN_MONTHS.map((label, i) => ({
                  value: i + 1,
                  label: `${i + 1} — ${label}`,
                }))}
              />
            </Col>
            <Col span={6}>
              <label className="field-label">Day</label>
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={gDays}
                value={gd}
                onChange={(v) => syncFromGregorian(gy, gm, v || 1)}
              />
            </Col>
          </Row>
          <div className="length-label" style={{ marginTop: 12 }}>
            <Text type="secondary">{gregorianStr}</Text>
            <CopyButton text={gregorianStr} />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Text strong>Jalali (Persian)</Text>
          <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
            <Col span={8}>
              <label className="field-label">سال</label>
              <InputNumber
                style={{ width: "100%" }}
                value={jy}
                onChange={(v) => syncFromJalali(v || jy, jm, jd)}
              />
            </Col>
            <Col span={10}>
              <label className="field-label">ماه</label>
              <Select
                style={{ width: "100%" }}
                value={jm}
                onChange={(m) => syncFromJalali(jy, m, jd)}
                options={PERSIAN_MONTHS.map((label, i) => ({
                  value: i + 1,
                  label: `${i + 1} — ${label}`,
                }))}
              />
            </Col>
            <Col span={6}>
              <label className="field-label">روز</label>
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={jDays}
                value={jd}
                onChange={(v) => syncFromJalali(jy, jm, v || 1)}
              />
            </Col>
          </Row>
          <div className="length-label" style={{ marginTop: 12 }}>
            <Text type="secondary" dir="rtl">
              {jalaliStr}
            </Text>
            <CopyButton text={jalaliStr} />
          </div>
        </Col>
      </Row>
      {error && (
        <Alert style={{ marginTop: 16 }} type="error" showIcon message={error} />
      )}
    </div>
  );
}
