import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomStringConfig } from "../../type";
import { BaseInputProps } from "./base-input";

export type StringInputProps = BaseInputProps & {
  config: CustomStringConfig;
};

export const StringInput = ({
  config,
  pathPrefix,
  showLabel = true,
}: StringInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const input = (
    <TextField
      {...register(path)}
      label={showLabel ? label : undefined}
      fullWidth
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
