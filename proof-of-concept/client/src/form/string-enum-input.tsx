import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useState } from "react";
import { CustomStringEnumConfig } from "../type";

export type StringInputProps = {
  config: CustomStringEnumConfig;
  pathPrefix: string;
};

export const StringEnumInput = ({ config, pathPrefix }: StringInputProps) => {
  const [value, setValue] = useState<string | undefined>();
  const { label, name, options, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  const handlechange: SelectProps<string>["onChange"] = (e) => {
    setValue(e.target.value);
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
