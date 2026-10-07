import { Alert, Input, Tabs } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

function validateSheba(raw: string) {
  const s = raw.replace(/\s+/g, "").toUpperCase();
  if (!/^IR\d{24}$/.test(s)) return false;
  const rearranged = s.slice(4) + "1827" + s.slice(2, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    remainder = Number(String(remainder) + ch) % 97;
  }
  return remainder === 1;
}

function validateCard(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!/^\d{16}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let n = Number(digits[i]);
    if (i % 2 === 0) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}

function maskCard(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export default function Sheba() {
  const [sheba, setSheba] = useState("");
  const [card, setCard] = useState("");
  const shebaOk = useMemo(() => (sheba ? validateSheba(sheba) : null), [sheba]);
  const cardOk = useMemo(() => (card.replace(/\D/g, "").length === 16 ? validateCard(card) : null), [card]);

  return (
    <div className="tool-panel">
      <PageHeader title="Sheba / Card" description="Validate Iranian IBAN (Sheba) and 16-digit card numbers (Luhn)." />
      <Tabs
        items={[
          {
            key: "sheba",
            label: "Sheba (IBAN)",
            children: (
              <>
                <Input
                  size="large"
                  value={sheba}
                  onChange={(e) => setSheba(e.target.value.toUpperCase())}
                  placeholder="IR…"
                  style={{ marginBottom: 12 }}
                />
                {shebaOk === null ? (
                  <Alert type="info" showIcon message="Enter IR + 24 digits" />
                ) : (
                  <Alert type={shebaOk ? "success" : "error"} showIcon message={shebaOk ? "Valid Sheba" : "Invalid Sheba"} />
                )}
              </>
            ),
          },
          {
            key: "card",
            label: "Card",
            children: (
              <>
                <Input
                  size="large"
                  value={maskCard(card)}
                  onChange={(e) => setCard(e.target.value)}
                  placeholder="6037 …"
                  style={{ marginBottom: 12 }}
                />
                {cardOk === null ? (
                  <Alert type="info" showIcon message="Enter a 16-digit card number" />
                ) : (
                  <Alert type={cardOk ? "success" : "error"} showIcon message={cardOk ? "Valid card checksum" : "Invalid card checksum"} />
                )}
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
