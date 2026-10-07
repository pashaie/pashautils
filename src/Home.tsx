import { Card, Col, Input, Row, Tag, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  categoryLabels,
  featuredTools,
  filterTools,
  toolsByCategory,
  type ToolCategory,
  type ToolMeta,
} from "./tools";

const { Title, Paragraph, Text } = Typography;

const categoryOrder: ToolCategory[] = [
  "text",
  "time",
  "network",
  "security",
  "image",
  "iran",
  "dev",
];

function ToolCard({
  tool,
  featured,
}: {
  tool: ToolMeta;
  featured?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      className={`tool-card ${featured ? "tool-card--featured" : ""}`}
      onClick={() => navigate(tool.path)}
    >
      <div className="tool-card__icon">{tool.icon}</div>
      <Title level={5} className="tool-card__title">
        {tool.label}
      </Title>
      <Text type="secondary" className="tool-card__desc">
        {tool.description}
      </Text>
    </Card>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterTools(query), [query]);
  const searching = query.trim().length > 0;

  const featured = useMemo(
    () => filtered.filter((t) => t.featured),
    [filtered]
  );
  const extras = useMemo(
    () => filtered.filter((t) => !t.featured),
    [filtered]
  );
  const grouped = useMemo(() => toolsByCategory(extras), [extras]);

  return (
    <div className="home">
      <div className="home__hero">
        <Title level={2} className="home__title">
          Pasha Utils
        </Title>
        <Paragraph type="secondary" className="home__lead">
          Featured tools stay up front. Search or browse categories for
          everything else.
        </Paragraph>
        <Input
          size="large"
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search tools (json, hash, شبا, jwt…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="home__search"
        />
      </div>

      {featured.length > 0 && (
        <section className="home__section">
          <div className="home__section-head">
            <Title level={4} className="home__section-title">
              Featured
            </Title>
            {!searching && <Tag color="blue">{featuredTools.length} core tools</Tag>}
          </div>
          <Row gutter={[16, 16]}>
            {featured.map((tool) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={tool.key}>
                <ToolCard tool={tool} featured />
              </Col>
            ))}
          </Row>
        </section>
      )}

      {!searching &&
        categoryOrder.map((cat) => {
          const list = grouped[cat] ?? [];
          if (!list.length) return null;
          return (
            <section className="home__section" key={cat} id={`cat-${cat}`}>
              <div className="home__section-head">
                <Title level={4} className="home__section-title">
                  {categoryLabels[cat]}
                </Title>
                <Tag>{list.length}</Tag>
              </div>
              <Row gutter={[16, 16]}>
                {list.map((tool) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={tool.key}>
                    <ToolCard tool={tool} />
                  </Col>
                ))}
              </Row>
            </section>
          );
        })}

      {searching && extras.length > 0 && (
        <section className="home__section">
          <div className="home__section-head">
            <Title level={4} className="home__section-title">
              Other matches
            </Title>
            <Tag>{extras.length}</Tag>
          </div>
          <Row gutter={[16, 16]}>
            {extras.map((tool) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={tool.key}>
                <ToolCard tool={tool} />
              </Col>
            ))}
          </Row>
        </section>
      )}

      {filtered.length === 0 && (
        <Paragraph type="secondary">No tools match “{query}”.</Paragraph>
      )}
    </div>
  );
}
