import { TextFieldProps } from "@mui/material";

export type BaseInputProps = {
  pathPrefix?: string;
  showLabel?: boolean;
  variant?: TextFieldProps["variant"];
};
