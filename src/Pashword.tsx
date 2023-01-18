import React, { useEffect, useState } from "react";
import {
  Alert,
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  QRCode,
  Row,
  Select,
  Spin,
  Tooltip,
} from "antd";
const { Option } = Select;
import { generatePashword } from "@pashword/pashword-lib";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

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
        label: `${x.website} - ${x.username} - ${x.length}`,
        value: x.website,
        credential: x,
      }))
    );
  }, []);
  const onSelect = (data: string, option: CredentialOption) => {
    form.setFieldsValue(option.credential);
  };

  const onFinish = async (values: any) => {
    setGenerating(true);
    let toHash = {
      website: values.website,
      username: values.username,
      secretKey: values.secretKey,
      length: +values.length,
    };

    let pashedPassword = await generatePashword(
      JSON.stringify(toHash),
      +values.length,
      values.website,
      values.username
    );

    const credentials = getCredentials();
    if (
      !credentials.find(
        (x) =>
          x.length === values.length &&
          x.website === values.website &&
          x.username === values.username
      )
    )
      setCredentials([...credentials, { ...toHash, secretKey: "" }]);

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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin spinning={generating}>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
          <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{ span: 4 }}
            //   wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Website"
              name="website"
              // tooltip="Website"
              rules={[{ required: true, message: "Please enter website" }]}
            >
              <AutoComplete options={credentialOptions} onSelect={onSelect} />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Secret Key"
              name="secretKey"
              rules={[{ required: true, message: "Please enter secret key" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="length" label="Length" initialValue={20}>
              <Select
                options={[
                  {
                    value: "10",
                    label: "Small",
                  },
                  {
                    value: "20",
                    label: "Medium",
                  },
                  {
                    value: "40",
                    label: "Large",
                  },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Generate
              </Button>
            </Form.Item>
          </Form>
          {generatedPashword && (
            <>
              <Divider></Divider>
              <Alert
                message={generatedPashword}
                type="success"
                action={
                  <CopyToClipboard text={generatedPashword}>
                    <Tooltip title="copy">
                      <Button icon={<CopyOutlined />} />
                    </Tooltip>
                  </CopyToClipboard>
                }
              />
              <QRCode value={generatedPashword}></QRCode>
            </>
          )}
        </Col>
      </Row>
    </Spin>
  );
}
