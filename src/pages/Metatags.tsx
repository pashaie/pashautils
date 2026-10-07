import { Col, Input, Row } from "antd";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

export default function Metatags() {
  const [title, setTitle] = useState("Pasha Utils");
  const [description, setDescription] = useState("Everyday developer helpers in your browser.");
  const [url, setUrl] = useState("https://pashaie.github.io/pashautils/");
  const [image, setImage] = useState("https://pashaie.github.io/pashautils/android-chrome-512x512.png");

  const tags = useMemo(
    () => `<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />`,
    [title, description, url, image]
  );

  return (
    <div>
      <PageHeader title="Meta Tags" description="Draft basic SEO / Open Graph tags and preview a social card." />
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <label className="field-label">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 12 }} />
          <label className="field-label">Description</label>
          <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: 12 }} />
          <label className="field-label">URL</label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} style={{ marginBottom: 12 }} />
          <label className="field-label">Image URL</label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} style={{ marginBottom: 12 }} />
          <div className="length-label">
            <label className="field-label">HTML</label>
            <CopyButton text={tags} label="Copy" />
          </div>
          <Input.TextArea rows={10} value={tags} readOnly />
        </Col>
        <Col xs={24} md={12}>
          <label className="field-label">Preview</label>
          <div className="meta-preview">
            {image ? <img className="meta-preview__img" src={image} alt="" /> : <div className="meta-preview__img" />}
            <div className="meta-preview__body">
              <div style={{ color: "#1877f2", fontSize: 12, marginBottom: 4 }}>{url.replace(/^https?:\/\//, "")}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ color: "rgba(0,0,0,0.55)", fontSize: 13 }}>{description}</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
