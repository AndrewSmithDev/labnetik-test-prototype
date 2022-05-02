import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { evaluateEquation } from "../../evaluator";
import { CustomComputedConfig } from "../../type";

export type ComputedInputProps = {
  config: CustomComputedConfig;
  pathPrefix: string;
};

export const ComputedInput = ({ config, pathPrefix }: ComputedInputProps) => {
  const { watch, register } = useFormContext();
  const data = watch();

  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  let value = evaluateEquation(config.equation, data);

  const input = (
    <TextField
      {...register(path)}
      label={label}
      disabled={true}
      fullWidth
      value={value ?? ""}
    />
  );
  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
