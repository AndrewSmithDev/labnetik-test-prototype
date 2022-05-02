import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { CustomBooleanField } from "../type";

export type BooleanInputProps = {
  config: CustomBooleanField;
  pathPrefix: string;
};

export const BooleanInput = ({ config, pathPrefix }: BooleanInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <FormControlLabel control={<Checkbox />} label={label} />;
};
