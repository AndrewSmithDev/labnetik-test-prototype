import { TextField } from "@mui/material";
import { CustomNumberField } from "../type";

export type NumberInputProps = {
  config: CustomNumberField;
  pathPrefix: string;
};

export const NumberInput = ({ config, pathPrefix }: NumberInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <TextField label={label} fullWidth type="number" />;
};
