import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useState } from "react";
import { CustomNumberEnumConfig } from "../type";

export type NumberInputProps = {
  config: CustomNumberEnumConfig;
  pathPrefix: string;
};

export const NumberEnumInput = ({ config, pathPrefix }: NumberInputProps) => {
  const [value, setValue] = useState<number | undefined>();
  const { label, name, options, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const handlechange: SelectProps<number>["onChange"] = (e) => {
    const { value } = e.target;
    const newNumber = typeof value === "string" ? parseFloat(value) : value;
    if (typeof newNumber === "number" && !isNaN(newNumber)) setValue(newNumber);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={path}>{label}</InputLabel>
      <Select
        id={path + ".selector"}
        labelId={path}
        value={value}
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
