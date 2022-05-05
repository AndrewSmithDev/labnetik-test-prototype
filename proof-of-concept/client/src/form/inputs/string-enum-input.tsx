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
import { CustomStringEnumConfig } from "../../config";
import { BaseInputProps } from "./base-input";
import * as R from "ramda";

export type StringEnumInputProps = BaseInputProps & {
  config: CustomStringEnumConfig;
};

export const StringEnumInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: StringEnumInputProps) => {
  const { label, name, options, tooltip, hidden } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const { formState } = useFormContext();
  const controller = useController({ name: path });

  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const handlechange: SelectProps<string>["onChange"] = (e) => {
    controller.field.onChange(e);
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
