import "./App.css";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  KeyOutlined,
  SafetyOutlined,
  HomeOutlined,
  GithubOutlined,
  GlobalOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const onClick = (info: MenuInfo) => {
    if (info.key === "github") {
      window.open("https://github.com/pashaie/pashautils", "_blank");
      return;
    }
    navigate(info.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          onClick={onClick}
          items={[
            {
              key: "github",
              icon: <GithubOutlined />,
              label: "Github",
            },
            {
              key: "",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "qr",
              icon: <QrcodeOutlined />,
              label: "QR Code",
            },
            {
              key: "base64",
              icon: <ReloadOutlined />,
              label: "Base64",
            },
            {
              key: "password",
              icon: <KeyOutlined />,
              label: "Password",
            },
            {
              key: "pashword",
              icon: <SafetyOutlined />,
              label: "Pashword",
            },
            {
              key: "nationalCode",
              icon: <GlobalOutlined />,
              label: "National Code",
            },
            {
              key: "jwt",
              icon: <StarOutlined />,
              label: "JWT",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
