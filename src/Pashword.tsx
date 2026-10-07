import { useEffect, useState } from "react";
import {
  Alert,
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  QRCode,
  Row,
  Select,
  Spin,
} from "antd";
import { generatePashword } from "@pashword/pashword-lib";
import PageHeader from "./components/PageHeader";
import CopyButton from "./components/CopyButton";

interface Credential {
  website: string;
  username: string;
  secretKey: string;
  length: number;
}

interface CredentialOption {
  value: string;
  label: string;
  credential: Credential;
}

export default function Pashword() {
  const [form] = Form.useForm();
  const [generatedPashword, setGeneratedPashword] = useState("");
  const [generating, setGenerating] = useState(false);
  const [credentialOptions, setCredentialOptions] = useState<
    CredentialOption[]
  >([]);

  useEffect(() => {
    const credentials = getCredentials();
    setCredentialOptions(
      credentials.map((x) => ({
        label: `${x.website} — ${x.username} (${x.length})`,
        value: x.website,
        credential: x,
      }))
    );
  }, []);

  const onSelect = (_data: string, option: CredentialOption) => {
    form.setFieldsValue(option.credential);
  };

  const onFinish = async (values: {
    website: string;
    username: string;
    secretKey: string;
    length: string | number;
  }) => {
    setGenerating(true);
    const toHash = {
      website: values.website,
      username: values.username,
      secretKey: values.secretKey,
      length: +values.length,
    };

    const pashedPassword = await generatePashword(
      JSON.stringify(toHash),
      +values.length,
      values.website,
      values.username
    );

    const credentials = getCredentials();
    if (
      !credentials.find(
        (x) =>
          x.length === toHash.length &&
          x.website === values.website &&
          x.username === values.username
      )
    ) {
      setCredentials([...credentials, { ...toHash, secretKey: "" }]);
      setCredentialOptions((prev) => [
        ...prev,
        {
          label: `${toHash.website} — ${toHash.username} (${toHash.length})`,
          value: toHash.website,
          credential: { ...toHash, secretKey: "" },
        },
      ]);
    }

    setGeneratedPashword(pashedPassword);
    setGenerating(false);
  };

  const getCredentials = () => {
    const credentialsStr = localStorage.getItem("credentials");
    if (!credentialsStr) return [];
    return JSON.parse(credentialsStr) as Credential[];
  };

  const setCredentials = (credentials: Credential[]) => {
    localStorage.setItem("credentials", JSON.stringify(credentials));
  };

  return (
    <Spin spinning={generating}>
      <div className="tool-panel">
        <PageHeader
          title="Pashword"
          description="Generate a deterministic password from a site, username, and your secret key. Past sites are remembered locally (secret is not stored)."
        />
        <Row gutter={[24, 24]}>
          <Col xs={24} md={14}>
            <Form
              form={form}
              layout="vertical"
              name="pashword"
              initialValues={{ length: "20" }}
              onFinish={onFinish}
              requiredMark="optional"
              autoComplete="off"
            >
              <Form.Item
                label="Website"
                name="website"
                rules={[{ required: true, message: "Enter a website" }]}
              >
                <AutoComplete
                  options={credentialOptions}
                  onSelect={onSelect}
                  placeholder="example.com"
                />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Enter a username" }]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>
              <Form.Item
                label="Secret Key"
                name="secretKey"
                rules={[{ required: true, message: "Enter your secret key" }]}
              >
                <Input.Password placeholder="Your master secret" />
              </Form.Item>
              <Form.Item name="length" label="Length">
                <Select
                  options={[
                    { value: "10", label: "Small (10)" },
                    { value: "20", label: "Medium (20)" },
                    { value: "40", label: "Large (40)" },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Generate
                </Button>
              </Form.Item>
            </Form>

            {generatedPashword && (
              <div className="tool-result">
                <Alert
                  message={
                    <span className="password-display">{generatedPashword}</span>
                  }
                  type="success"
                  showIcon
                  action={<CopyButton text={generatedPashword} />}
                />
              </div>
            )}
          </Col>
          <Col xs={24} md={10}>
            {generatedPashword ? (
              <div className="qr-preview">
                <QRCode value={generatedPashword} size={160} />
                <CopyButton text={generatedPashword} label="Copy password" />
              </div>
            ) : (
              <div className="qr-preview">
                <span style={{ color: "rgba(0,0,0,0.45)", textAlign: "center" }}>
                  Your password QR will appear here after generating
                </span>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
