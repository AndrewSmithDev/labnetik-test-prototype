import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Tooltip,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { CustomNumberEnumConfig } from "../../config-schema";
import { BaseInputProps } from "./base-input";
import * as R from "ramda";

export type NumberEnumInputProps = BaseInputProps & {
  config: CustomNumberEnumConfig;
};

export const NumberEnumInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
  isInArray,
}: NumberEnumInputProps) => {
  const { label, name, options, tooltip, hidden } = config;
  const path = (() => {
    if (isInArray) return pathPrefix ?? "0";
    if (pathPrefix) return `${pathPrefix}.${name}`;
    return name;
  })();

  const { formState } = useFormContext();
  const controller = useController({ name: path });

  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const handlechange: SelectProps<number>["onChange"] = (event) => {
    const { value } = event.target;
    const newNumber = typeof value === "string" ? parseFloat(value) : value;
    if (typeof newNumber === "number" && !isNaN(newNumber))
      controller.field.onChange(event, newNumber);
  };

  const input = (
    <FormControl fullWidth>
      {showLabel && <InputLabel id={path}>{label}</InputLabel>}
      <Select
        id={path + ".selector"}
        labelId={showLabel ? path : undefined}
        value={controller.field.value}
        label={showLabel ? label : undefined}
        onChange={handlechange}
        variant={variant}
        error={!!error}
      >
        {options.values.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error?.message && (
        <FormHelperText error={!!error}>{error.message}</FormHelperText>
      )}
    </FormControl>
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
