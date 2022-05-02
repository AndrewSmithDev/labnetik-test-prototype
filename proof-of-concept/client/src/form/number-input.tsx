import { TextField } from "@mui/material";
import { CustomNumberConfig } from "../type";

export type NumberInputProps = {
  config: CustomNumberConfig;
  pathPrefix: string;
};

export const NumberInput = ({ config, pathPrefix }: NumberInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <TextField label={label} fullWidth type="number" />;
};
