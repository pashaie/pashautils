import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
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
import {
  categoryLabels,
  extraTools,
  featuredTools,
  getToolByPath,
  toolsByCategory,
  type ToolCategory,
} from "./tools";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const extraCategoryOrder: ToolCategory[] = [
  "text",
  "time",
  "network",
  "security",
  "image",
  "iran",
  "dev",
];

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

  const groupedExtras = useMemo(() => toolsByCategory(extraTools), []);

  const menuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "",
        icon: <HomeOutlined />,
        label: "Home",
      },
      {
        type: "group",
        label: collapsed ? undefined : "Featured",
        children: featuredTools.map((tool) => ({
          key: tool.path,
          icon: tool.icon,
          label: tool.label,
        })),
      },
      {
        type: "group",
        label: collapsed ? undefined : "More tools",
        children: extraCategoryOrder
          .filter((cat) => (groupedExtras[cat] ?? []).length > 0)
          .map((cat) => ({
            key: `cat-${cat}`,
            label: categoryLabels[cat],
            children: (groupedExtras[cat] ?? []).map((tool) => ({
              key: tool.path,
              icon: tool.icon,
              label: tool.label,
            })),
          })),
      },
      { type: "divider" },
      {
        key: "github",
        icon: <GithubOutlined />,
        label: "GitHub",
      },
    ],
    [collapsed, groupedExtras]
  );

  const onClick: MenuProps["onClick"] = (info) => {
    if (info.key === "github") {
      window.open("https://github.com/pashaie/pashautils", "_blank");
      return;
    }
    if (String(info.key).startsWith("cat-")) return;
    navigate(info.key);
    if (isMobile) setCollapsed(true);
  };

  const openKeys = useMemo(() => {
    if (!selectedKey || featuredTools.some((t) => t.key === selectedKey)) {
      return [];
    }
    const tool = extraTools.find((t) => t.key === selectedKey);
    return tool ? [`cat-${tool.category}`] : [];
  }, [selectedKey]);

  return (
    <Layout className="app-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        width={260}
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
          defaultOpenKeys={openKeys}
          onClick={onClick}
          items={menuItems}
          style={{ borderInlineEnd: 0 }}
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
              {activeTool?.label ??
                (selectedKey === "" ? "Home" : "Pasha Utils")}
            </Text>
            {activeTool && (
              <Text type="secondary" className="app-header__hint">
                {activeTool.description}
              </Text>
            )}
          </div>
        </Header>
        <Content
          className="app-content"
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
