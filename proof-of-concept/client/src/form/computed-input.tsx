import { TextField } from "@mui/material";
import { evaluateEquation } from "../evaluator";
import { CustomComputedConfig } from "../type";

export type ComputedInputProps = {
  config: CustomComputedConfig;
  pathPrefix: string;
  values: any;
};

export const ComputedInput = ({
  config,
  pathPrefix,
  values,
}: ComputedInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const value = evaluateEquation(config.equation, values);

  return (
    <TextField
      label={label}
      disabled={true}
      fullWidth
      type="number"
      value={value}
    />
  );
};
