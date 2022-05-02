import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Tooltip,
} from "@mui/material";
import { useController } from "react-hook-form";
import { CustomStringEnumConfig } from "../../type";

export type StringEnumInputProps = {
  config: CustomStringEnumConfig;
  pathPrefix: string;
  showLabel?: boolean;
};

export const StringEnumInput = ({
  config,
  pathPrefix,
  showLabel = true,
}: StringEnumInputProps) => {
  const { label, name, options, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const controller = useController({ name: path });

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
      >
        {options.values.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  if (!tooltip) return input;

  return (
    <Tooltip title={tooltip} placement="top-start" arrow>
      {input}
    </Tooltip>
  );
};
