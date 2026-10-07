import "./App.css";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubOutlined,
  HomeOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Button, Grid, Layout, Menu, Typography, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { getToolByPath, tools } from "./tools";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const activeTool = getToolByPath(location.pathname);
  const selectedKey =
    location.pathname.replace(/\/pashautils\/?/, "").split("/")[0] || "";

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const onClick: MenuProps["onClick"] = (info) => {
    if (info.key === "github") {
      window.open("https://github.com/pashaie/pashautils", "_blank");
      return;
    }
    navigate(info.key);
    if (isMobile) setCollapsed(true);
  };

  return (
    <Layout className="app-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        width={240}
        className="app-sider"
      >
        <div
          className={`brand ${collapsed ? "brand--collapsed" : ""}`}
          onClick={() => navigate("")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("")}
        >
          <ToolOutlined className="brand__icon" />
          {!collapsed && (
            <div className="brand__text">
              <Title level={5} className="brand__title">
                Pasha Utils
              </Title>
              <Text type="secondary" className="brand__sub">
                Everyday helpers
              </Text>
            </div>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={onClick}
          items={[
            {
              key: "",
              icon: <HomeOutlined />,
              label: "Home",
            },
            ...tools.map((tool) => ({
              key: tool.path,
              icon: tool.icon,
              label: tool.label,
            })),
            { type: "divider" as const },
            {
              key: "github",
              icon: <GithubOutlined />,
              label: "GitHub",
            },
          ]}
        />
      </Sider>
      {isMobile && !collapsed && (
        <div
          className="sider-mask"
          onClick={() => setCollapsed(true)}
          aria-hidden
        />
      )}
      <Layout className="site-layout">
        <Header
          className="app-header"
          style={{
            background: colorBgContainer,
            borderBottom: `1px solid ${colorBorderSecondary}`,
          }}
        >
          <Button
            type="text"
            className="trigger"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle menu"
          />
          <div className="app-header__title">
            <Text strong>
              {activeTool?.label ?? (selectedKey === "" ? "Home" : "Pasha Utils")}
            </Text>
            {activeTool && (
              <Text type="secondary" className="app-header__hint">
                {activeTool.description}
              </Text>
            )}
          </div>
        </Header>
        <Content className="app-content" style={{ background: colorBgContainer }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
