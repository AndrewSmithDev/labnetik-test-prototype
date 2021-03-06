import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomBooleanConfig } from "../../config-schema";
import { BaseInputProps } from "./base-input";

export type BooleanInputProps = Omit<BaseInputProps, "variant"> & {
  config: CustomBooleanConfig;
};

export const BooleanInput = ({
  config,
  pathPrefix,
  showLabel = true,
}: BooleanInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const input = showLabel ? (
    <FormControlLabel
      {...register(path)}
      control={<Checkbox {...register(path)} />}
      label={label}
    />
  ) : (
    <Checkbox {...register(path)} size="small" />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
