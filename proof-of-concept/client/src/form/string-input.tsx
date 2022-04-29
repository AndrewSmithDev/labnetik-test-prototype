import { CustomStringField } from "../type";

export type StringInputProps = {
  config: CustomStringField;
  pathPrefix: string;
};

export const StringInput = ({ config, pathPrefix }: StringInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return (
    <div style={{ display: "flex" }}>
      <label style={{ flexGrow: 1, width: 1 }}>{label}:</label>
      <input style={{ flexGrow: 4, width: 1 }} type="text" name={path} />
    </div>
  );
};
