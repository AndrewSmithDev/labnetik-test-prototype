import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomNumberConfig } from "../../type";
import { BaseInputProps } from "./base-input";

export type NumberInputProps = BaseInputProps & {
  config: CustomNumberConfig;
};

export const NumberInput = ({
  config,
  pathPrefix,
  showLabel = true,
}: NumberInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const input = (
    <TextField
      {...register(path)}
      label={showLabel ? label : undefined}
      fullWidth
      type="number"
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
