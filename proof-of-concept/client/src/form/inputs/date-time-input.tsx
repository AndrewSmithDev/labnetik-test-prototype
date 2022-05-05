import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomDateTimeConfig } from "../../config";
import { BaseInputProps } from "./base-input";

export type DateTimeInputProps = BaseInputProps & {
  config: CustomDateTimeConfig;
};

export const DateTimeInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: DateTimeInputProps) => {
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
      type="datetime-local"
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
