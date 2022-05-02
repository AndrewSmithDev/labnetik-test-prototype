import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useController } from "react-hook-form";
import { CustomNumberEnumConfig } from "../../type";

export type NumberEnumInputProps = {
  config: CustomNumberEnumConfig;
  pathPrefix: string;
  showLabel?: boolean;
};

export const NumberEnumInput = ({
  config,
  pathPrefix,
  showLabel = true,
}: NumberInputProps) => {
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
};
