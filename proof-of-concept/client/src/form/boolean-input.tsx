import { Checkbox, FormControlLabel } from "@mui/material";
import { CustomBooleanConfig } from "../type";

export type BooleanInputProps = {
  config: CustomBooleanConfig;
  pathPrefix: string;
};

export const BooleanInput = ({ config, pathPrefix }: BooleanInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <FormControlLabel control={<Checkbox />} label={label} />;
};
