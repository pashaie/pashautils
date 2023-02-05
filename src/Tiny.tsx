import { Button, Col, Divider, Input, QRCode, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
const supabase = new SupabaseClient(
  "https://gxtdiwllbbgrhdxonxyd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dGRpd2xsYmJncmhkeG9ueHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MDMyNjQsImV4cCI6MTk5MTE3OTI2NH0.DwxvAYVl6uKKYsW0XiLjxvzg1dTd6ku0JR2AKBtGv_0"
);

export default function Tiny() {
  const [val, setVal] = useState("url");
  const [short, setShort] = useState("");

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { error, data } = await supabase.from("urls").select().eq("id", id);
      if (data && data[0] && data[0].url) {
        window.location.href = data[0].url;
      }
    })();
  }, [id]);

  const generateUrl = async () => {
    const { error, data } = await supabase
      .from("urls")
      .insert({ url: val })
      .select();
    setShort(
      "https://pashaie.github.io/pashautils/tiny/" + (data as any)[0].id
    );
  };
  return (
    <div>
      <Row justify="center">
        <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
          <Input
            placeholder="text or url"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Button onClick={generateUrl}>Generate</Button>
          <Divider>{short}</Divider>
          <QRCode value={short} />
        </Col>
      </Row>
    </div>
  );
}
