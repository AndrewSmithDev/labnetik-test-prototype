import { TextField } from "@mui/material";
import { CustomStringConfig } from "../type";

export type StringInputProps = {
  config: CustomStringConfig;
  pathPrefix: string;
};

export const StringInput = ({ config, pathPrefix }: StringInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <TextField label={label} fullWidth />;
};
