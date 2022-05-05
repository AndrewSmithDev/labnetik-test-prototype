import { useState } from "react";
import { ConfigEditor } from "./config-editor/config-editor";
import { exampleConfig2 } from "./example-config";
import { FormGenerator } from "../form";

export const Wrapper = () => {
  const [config, setConfig] = useState(exampleConfig2);
  return (
    <div style={{ display: "flex", gap: 32, margin: 32 }}>
      <ConfigEditor config={config} setConfig={setConfig} />
      <FormGenerator config={config} />
    </div>
  );
};
