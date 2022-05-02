import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomStringConfig } from "../type";

export type StringInputProps = {
  config: CustomStringConfig;
  pathPrefix: string;
};

export const StringInput = ({ config, pathPrefix }: StringInputProps) => {
  const { register } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = `${pathPrefix}.${name}`;

  return <TextField {...register(path)} label={label} fullWidth />;
};
