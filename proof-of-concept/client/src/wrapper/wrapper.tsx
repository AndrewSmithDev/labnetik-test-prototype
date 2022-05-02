import { useState } from "react";
import { ConfigEditor } from "../config-editor/config-editor";
import { exampleConfig1 } from "../example";
import { FormGenerator } from "../form";

export const Wrapper = () => {
  const [config, setConfig] = useState(exampleConfig1);
  return (
    <div style={{ display: "flex" }}>
      <ConfigEditor config={config} setConfig={setConfig} />
      <FormGenerator config={config} />
    </div>
  );
};
