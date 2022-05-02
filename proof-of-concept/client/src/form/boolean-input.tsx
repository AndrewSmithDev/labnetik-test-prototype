import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomBooleanConfig } from "../type";

export type BooleanInputProps = {
  config: CustomBooleanConfig;
  pathPrefix: string;
};

export const BooleanInput = ({ config, pathPrefix }: BooleanInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return (
    <FormControlLabel
      {...register(path)}
      control={<Checkbox {...register(path)} />}
      label={label}
    />
  );
};
