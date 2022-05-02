import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useController } from "react-hook-form";
import { CustomStringEnumConfig } from "../type";

export type StringInputProps = {
  config: CustomStringEnumConfig;
  pathPrefix: string;
};

export const StringEnumInput = ({ config, pathPrefix }: StringInputProps) => {
  const { label, name, options, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const controller = useController({ name: path });

  const handlechange: SelectProps<string>["onChange"] = (e) => {
    controller.field.onChange(e);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={path}>{label}</InputLabel>
      <Select
        id={path + ".selector"}
        labelId={path}
        value={controller.field.value}
        label={label}
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
};
