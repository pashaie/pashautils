import { Typography } from "antd";
import type { ReactNode } from "react";

const { Title, Paragraph } = Typography;

interface PageHeaderProps {
  title: string;
  description?: string;
  extra?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  extra,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header__text">
        <Title level={3} className="page-header__title">
          {title}
        </Title>
        {description && (
          <Paragraph type="secondary" className="page-header__desc">
            {description}
          </Paragraph>
        )}
      </div>
      {extra && <div className="page-header__extra">{extra}</div>}
    </div>
  );
}
