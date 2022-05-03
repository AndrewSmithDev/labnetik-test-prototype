import { TextField, Tooltip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomStringConfig } from "../../type";

export type StringInputProps = {
  config: CustomStringConfig;
  pathPrefix?: string;
  showLabel?: boolean;
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
