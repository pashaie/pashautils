import { Input, InputNumber } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
const teens = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
const tens = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
const hundreds = ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  const parts: string[] = [];
  if (h) parts.push(hundreds[h]);
  if (t === 1) parts.push(teens[o]);
  else {
    if (t) parts.push(tens[t]);
    if (o) parts.push(ones[o]);
  }
  return parts.join(" و ");
}

function toPersianWords(n: number): string {
  if (n === 0) return "صفر";
  if (n < 0) return "منفی " + toPersianWords(-n);
  const parts: string[] = [];
  let scale = 0;
  let x = Math.floor(n);
  while (x > 0 && scale < scales.length) {
    const chunk = x % 1000;
    if (chunk) {
      const words = threeDigits(chunk);
      parts.unshift(scales[scale] ? `${words} ${scales[scale]}` : words);
    }
    x = Math.floor(x / 1000);
    scale += 1;
  }
  return parts.join(" و ");
}

export default function NumWords() {
  const [value, setValue] = useState<number | null>(123456);
  const words = useMemo(() => toPersianWords(value ?? 0), [value]);

  return (
    <div className="tool-panel">
      <PageHeader title="Number → Words" description="Convert integers to Persian words." />
      <label className="field-label">Number</label>
      <InputNumber
        style={{ width: "100%", marginBottom: 16 }}
        value={value}
        onChange={(v) => setValue(v)}
        max={1e15}
      />
      <div className="length-label">
        <label className="field-label">Persian</label>
        <CopyButton text={words} />
      </div>
      <Input size="large" value={words} readOnly dir="rtl" />
    </div>
  );
}
