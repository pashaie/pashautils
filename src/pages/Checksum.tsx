import { Alert, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CopyButton from "../components/CopyButton";

const algos = ["SHA256", "SHA1", "SHA512", "MD5"] as const;

function bufferToWordArray(buffer: ArrayBuffer) {
  const u8 = new Uint8Array(buffer);
  const words: number[] = [];
  for (let i = 0; i < u8.length; i += 1) {
    words[i >>> 2] |= u8[i] << (24 - (i % 4) * 8);
  }
  return CryptoJS.lib.WordArray.create(words, u8.length);
}

export default function Checksum() {
  const [algo, setAlgo] = useState<(typeof algos)[number]>("SHA256");
  const [hash, setHash] = useState("");
  const [name, setName] = useState("");

  const run = async (file: File) => {
    const buf = await file.arrayBuffer();
    const wa = bufferToWordArray(buf);
    const map = {
      SHA256: CryptoJS.SHA256,
      SHA1: CryptoJS.SHA1,
      SHA512: CryptoJS.SHA512,
      MD5: CryptoJS.MD5,
    };
    setHash(map[algo](wa).toString());
    setName(file.name);
  };

  return (
    <div className="tool-panel">
      <PageHeader title="File Checksum" description="Compute digests for any file without uploading it." />
      <label className="field-label">Algorithm</label>
      <Select style={{ width: 200, marginBottom: 16 }} value={algo} onChange={setAlgo} options={algos.map((a) => ({ value: a, label: a }))} />
      <Upload.Dragger showUploadList={false} beforeUpload={(file) => { run(file); return false; }}>
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Drop a file to hash</p>
      </Upload.Dragger>
      {hash && (
        <Alert
          style={{ marginTop: 16 }}
          type="success"
          showIcon
          message={name}
          description={<span className="password-display">{hash}</span>}
          action={<CopyButton text={hash} />}
        />
      )}
    </div>
  );
}
