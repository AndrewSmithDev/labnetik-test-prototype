import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomTimeConfig } from "../../type";
import { BaseInputProps } from "./base-input";

export type TimeInputProps = BaseInputProps & {
  config: CustomTimeConfig;
};

export const TimeInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: TimeInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const input = (
    <TextField
      {...register(path)}
      label={showLabel ? label : undefined}
      InputLabelProps={{ shrink: true }}
      fullWidth
      variant={variant}
      type="time"
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
