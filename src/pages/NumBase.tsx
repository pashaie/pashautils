import { Col, Input, Row } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function NumBase() {
  const [dec, setDec] = useState("255");

  const values = useMemo(() => {
    try {
      const n = BigInt(dec.trim() || "0");
      return {
        bin: n.toString(2),
        oct: n.toString(8),
        dec: n.toString(10),
        hex: n.toString(16).toUpperCase(),
        error: "",
      };
    } catch {
      return { bin: "", oct: "", dec: "", hex: "", error: "Invalid integer" };
    }
  }, [dec]);

  const setFrom = (raw: string, base: number) => {
    try {
      const n = BigInt(parseInt(raw.replace(/^0x/i, ""), base));
      if (Number.isNaN(Number(n)) && raw !== "0") {
        // BigInt from parseInt can be NaN path - use BigInt directly for dec
      }
      setDec(BigInt(parseInt(raw, base)).toString(10));
    } catch {
      /* ignore while typing */
    }
  };

  const fields = [
    { label: "Decimal", value: values.dec, onChange: (v: string) => setDec(v.replace(/[^\d-]/g, "")) },
    { label: "Binary", value: values.bin, onChange: (v: string) => setFrom(v.replace(/[^01]/g, "") || "0", 2) },
    { label: "Octal", value: values.oct, onChange: (v: string) => setFrom(v.replace(/[^0-7]/g, "") || "0", 8) },
    { label: "Hex", value: values.hex, onChange: (v: string) => setFrom(v.replace(/[^0-9a-fA-F]/g, "") || "0", 16) },
  ];

  return (
    <div className="tool-panel">
      <PageHeader title="Number Base" description="Convert integers between binary, octal, decimal, and hexadecimal." />
      <Row gutter={[16, 16]}>
        {fields.map((f) => (
          <Col xs={24} md={12} key={f.label}>
            <div className="length-label">
              <label className="field-label">{f.label}</label>
              <CopyButton text={f.value} />
            </div>
            <Input value={f.value} onChange={(e) => f.onChange(e.target.value)} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
