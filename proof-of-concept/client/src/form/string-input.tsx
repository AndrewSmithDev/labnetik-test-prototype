import { TextField } from "@mui/material";
import { CustomStringField } from "../type";

export type StringInputProps = {
  config: CustomStringField;
  pathPrefix: string;
};

export const StringInput = ({ config, pathPrefix }: StringInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <TextField label={label} fullWidth />;
};
