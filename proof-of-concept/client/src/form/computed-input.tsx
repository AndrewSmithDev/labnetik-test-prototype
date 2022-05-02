import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { evaluateEquation } from "../evaluator";
import { CustomComputedConfig } from "../type";

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
  if (value?.value) value = value.value;

  return (
    <TextField
      {...register(path)}
      label={label}
      disabled={true}
      fullWidth
      type="number"
      value={value ?? ""}
    />
  );
};
