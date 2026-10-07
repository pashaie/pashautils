import { Alert, Button, Col, Input, QRCode, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
import { LinkOutlined } from "@ant-design/icons";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

const supabase = new SupabaseClient(
  "https://gxtdiwllbbgrhdxonxyd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dGRpd2xsYmJncmhkeG9ueHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MDMyNjQsImV4cCI6MTk5MTE3OTI2NH0.DwxvAYVl6uKKYsW0XiLjxvzg1dTd6ku0JR2AKBtGv_0"
);

export default function Tiny() {
  const [val, setVal] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from("urls").select().eq("id", id);
      if (data && data[0] && data[0].url) {
        window.location.href = data[0].url;
      }
    })();
  }, [id]);

  const generateUrl = async () => {
    const url = val.trim();
    if (!url) {
      setError("Enter a URL to shorten");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data, error: insertError } = await supabase
        .from("urls")
        .insert({ url })
        .select();
      if (insertError) throw insertError;
      setShort(
        "https://pashaie.github.io/pashautils/tiny/" + (data as { id: string }[])[0].id
      );
    } catch {
      setError("Could not create short link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-panel">
      <PageHeader
        title="Tiny URL"
        description="Shorten a long link and get a shareable URL plus QR code."
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <label className="field-label">Long URL</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              size="large"
              prefix={<LinkOutlined />}
              placeholder="https://example.com/very/long/path"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onPressEnter={generateUrl}
            />
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={generateUrl}
            >
              Shorten
            </Button>
          </Space.Compact>

          {error && (
            <Alert
              style={{ marginTop: 16 }}
              type="error"
              showIcon
              message={error}
            />
          )}

          {short && (
            <div className="tool-result">
              <Alert
                type="success"
                showIcon
                message="Short link ready"
                description={<span className="short-url">{short}</span>}
                action={<CopyButton text={short} label="Copy" />}
              />
            </div>
          )}
        </Col>
        <Col xs={24} md={10}>
          <div className="qr-preview">
            {short ? (
              <>
                <QRCode value={short} size={160} />
                <CopyButton text={short} label="Copy short URL" />
              </>
            ) : (
              <span style={{ color: "rgba(0,0,0,0.45)", textAlign: "center" }}>
                QR code appears after you shorten a link
              </span>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
