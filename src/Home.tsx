import { Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { tools } from "./tools";

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__hero">
        <Title level={2} className="home__title">
          Pasha Utils
        </Title>
        <Paragraph type="secondary" className="home__lead">
          Small, focused tools for everyday developer tasks — pick one to get
          started.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        {tools.map((tool) => (
          <Col xs={24} sm={12} lg={8} key={tool.key}>
            <Card
              hoverable
              className="tool-card"
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
          </Col>
        ))}
      </Row>
    </div>
  );
}
