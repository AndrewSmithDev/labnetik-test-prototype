import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { evaluateEquation } from "../../evaluator";
import { CustomComputedConfig } from "../../config-schema";
import { BaseInputProps } from "./base-input";

export type ComputedInputProps = BaseInputProps & {
  config: CustomComputedConfig;
};

export const ComputedInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: ComputedInputProps) => {
  const { watch, register } = useFormContext();
  const data = watch();

  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  let value = evaluateEquation(config.equation, data);

  const input = (
    <TextField
      {...register(path)}
      label={showLabel ? label : undefined}
      disabled={true}
      fullWidth
      value={value ?? ""}
      variant={variant}
    />
  );
  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
