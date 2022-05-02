import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useController } from "react-hook-form";
import { CustomNumberEnumConfig } from "../type";

export type NumberInputProps = {
  config: CustomNumberEnumConfig;
  pathPrefix: string;
};

export const NumberEnumInput = ({ config, pathPrefix }: NumberInputProps) => {
  const { label, name, options, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const controller = useController({ name: path });

  const handlechange: SelectProps<number>["onChange"] = (event) => {
    const { value } = event.target;
    const newNumber = typeof value === "string" ? parseFloat(value) : value;
    if (typeof newNumber === "number" && !isNaN(newNumber))
      controller.field.onChange(event, newNumber);
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
