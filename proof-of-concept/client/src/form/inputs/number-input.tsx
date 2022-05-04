import { TextField, Tooltip } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { CustomNumberConfig } from "../../type";
import { BaseInputProps } from "./base-input";

export type NumberInputProps = BaseInputProps & {
  config: CustomNumberConfig;
};

export const NumberInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: NumberInputProps) => {
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;
  const controller = useController({ name: path });

  console.log({ controller });

  const input = (
    <TextField
      {...controller.field}
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
