import { TextField, Tooltip } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { CustomStringConfig } from "../../config-schema";
import { BaseInputProps } from "./base-input";
import * as R from "ramda";
import { useMemo } from "react";

export type StringInputProps = BaseInputProps & {
  config: CustomStringConfig;
};

export const StringInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
  isInArray,
}: StringInputProps) => {
  const { trigger, formState } = useFormContext();
  const { label, name, tooltip, hidden } = config;

  const path = (() => {
    if (isInArray) return pathPrefix ?? "0";
    if (pathPrefix) return `${pathPrefix}.${name}`;
    return name;
  })();

  const { field } = useController({ name: path });

  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const input = (
    <TextField
      {...field}
      onChange={(e) => {
        field.onChange(e);
        trigger(path);
      }}
      label={showLabel ? label : undefined}
      fullWidth
      variant={variant}
      error={!!error}
      helperText={error?.message}
    />
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
