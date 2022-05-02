import { DOMAttributes } from "react";

export type ConfigEditorProps = {
  config: any;
  setConfig: (config: any) => void;
};

export const ConfigEditor = ({ config, setConfig }: ConfigEditorProps) => {
  const handleUpdate: DOMAttributes<HTMLTextAreaElement>["onBlur"] = (e) => {
    const newConfig = JSON.parse(e.target.value);
    setConfig(newConfig);
  };

  return (
    <div style={{ width: "50%" }}>
      <textarea style={{ width: "90%", height: "90vh" }} onBlur={handleUpdate}>
        {JSON.stringify(config, null, 2)}
      </textarea>
    </div>
  );
};
