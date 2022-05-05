import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomDateTimeConfig } from "../../config-schema";
import { BaseInputProps } from "./base-input";
import * as R from "ramda";

export type DateTimeInputProps = BaseInputProps & {
  config: CustomDateTimeConfig;
};

export const DateTimeInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: DateTimeInputProps) => {
  const { register, formState } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;
  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const input = (
    <TextField
      {...register(path)}
      label={showLabel ? label : undefined}
      InputLabelProps={{ shrink: true }}
      fullWidth
      variant={variant}
      type="datetime-local"
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
