import { DOMAttributes, useState } from "react";
import { TestConfig, testConfigSchema } from "../type";

export type ConfigEditorProps = {
  config: TestConfig;
  setConfig: (config: TestConfig) => void;
};

export const ConfigEditor = ({ config, setConfig }: ConfigEditorProps) => {
  const [error, setError] = useState("");

  const handleUpdate: DOMAttributes<HTMLTextAreaElement>["onBlur"] = (e) => {
    setError("");

    const newConfig = JSON.parse(e.target.value);
    const parseResult = testConfigSchema.safeParse(newConfig);

    if (parseResult.success) {
      setConfig(parseResult.data);
    } else {
      setError(JSON.stringify(parseResult.error, null, 2));
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <pre>
        <code style={{ color: "red" }}>{error}</code>
      </pre>
      <textarea style={{ width: "100%", height: "90vh" }} onBlur={handleUpdate}>
        {JSON.stringify(config, null, 2)}
      </textarea>
    </div>
  );
};
