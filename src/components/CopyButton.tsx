import { CopyOutlined } from "@ant-design/icons";
import { Button, Tooltip, message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";

interface CopyButtonProps {
  text: string;
  label?: string;
  type?: "default" | "primary" | "dashed" | "link" | "text";
}

export default function CopyButton({
  text,
  label,
  type = "default",
}: CopyButtonProps) {
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => message.success("Copied to clipboard")}
    >
      <Tooltip title="Copy">
        <Button
          type={type}
          icon={<CopyOutlined />}
          disabled={!text}
          aria-label="Copy"
        >
          {label}
        </Button>
      </Tooltip>
    </CopyToClipboard>
  );
}
