import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomNumberConfig } from "../../type";

export type NumberInputProps = {
  config: CustomNumberConfig;
  pathPrefix: string;
  showLabel?: boolean;
};

export const NumberInput = ({
  config,
  pathPrefix,
  showLabel = true,
}: NumberInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

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
