import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomDateConfig } from "../../config";
import { BaseInputProps } from "./base-input";

export type DateInputProps = BaseInputProps & {
  config: CustomDateConfig;
};

export const DateInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: DateInputProps) => {
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
      type="date"
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
