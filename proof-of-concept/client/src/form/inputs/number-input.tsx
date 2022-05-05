import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomNumberConfig } from "../../type";
import { BaseInputProps } from "./base-input";
import * as R from "ramda";

export type NumberInputProps = BaseInputProps & {
  config: CustomNumberConfig;
};

export const NumberInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: NumberInputProps) => {
  const { register, formState } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const input = (
    <TextField
      {...register(path)}
      label={showLabel ? label : undefined}
      fullWidth
      type="number"
      variant={variant}
      error={!!error}
      helperText={error?.message}
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
