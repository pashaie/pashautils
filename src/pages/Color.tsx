import { Col, Input, Row } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[\da-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function Color() {
  const [hex, setHex] = useState("#1677ff");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  return (
    <div className="tool-panel">
      <PageHeader title="Color Converter" description="Convert HEX colors to RGB and HSL with a live swatch." />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <div className="color-swatch" style={{ background: rgb ? hex : "#ccc" }} />
        </Col>
        <Col xs={24} md={14}>
          <label className="field-label">HEX</label>
          <Input value={hex} onChange={(e) => setHex(e.target.value)} addonAfter={<CopyButton text={hex} />} style={{ marginBottom: 12 }} />
          <label className="field-label">RGB</label>
          <Input
            readOnly
            value={rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid"}
            addonAfter={<CopyButton text={rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : ""} />}
            style={{ marginBottom: 12 }}
          />
          <label className="field-label">HSL</label>
          <Input
            readOnly
            value={hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid"}
            addonAfter={<CopyButton text={hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : ""} />}
          />
        </Col>
      </Row>
    </div>
  );
}
