import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomBooleanConfig } from "../../type";

export type BooleanInputProps = {
  config: CustomBooleanConfig;
  pathPrefix: string;
};

export const BooleanInput = ({ config, pathPrefix }: BooleanInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const input = (
    <FormControlLabel
      {...register(path)}
      control={<Checkbox {...register(path)} />}
      label={label}
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
