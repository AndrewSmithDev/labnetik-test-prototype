import { Typography } from "@mui/material";
import {
  CustomStringEnumConfig,
  CustomNumberEnumConfig,
  SectionConfig,
} from "../type";
import { BooleanInput } from "./boolean-input";
import { ComputedInput } from "./computed-input";
import { NumberEnumInput } from "./number-enum-input";
import { NumberInput } from "./number-input";
import { StringEnumInput } from "./string-enum-input";
import { StringInput } from "./string-input";

export type FormSectionProps = {
  config: SectionConfig;
  pathPrefix?: string;
};

export const FormSection = ({ config, pathPrefix }: FormSectionProps) => {
  const { label, name, fields } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  return (
    <section
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        marginBottom: 16,
      }}
    >
      <Typography variant="h5">{label}</Typography>
      {Object.values(fields).map((fieldConfig) => {
        if (fieldConfig.type === "string")
          return <StringInput config={fieldConfig} pathPrefix={path} />;
        if (fieldConfig.type === "number")
          return <NumberInput config={fieldConfig} pathPrefix={path} />;
        if (fieldConfig.type === "boolean")
          return <BooleanInput config={fieldConfig} pathPrefix={path} />;
        if (
          fieldConfig.type === "enum" &&
          fieldConfig.options.type === "string"
        )
          return (
            <StringEnumInput
              config={fieldConfig as CustomStringEnumConfig}
              pathPrefix={path}
            />
          );
        if (
          fieldConfig.type === "enum" &&
          fieldConfig.options.type === "number"
        )
          return (
            <NumberEnumInput
              config={fieldConfig as CustomNumberEnumConfig}
              pathPrefix={path}
            />
          );
        if (fieldConfig.type === "computed")
          return <ComputedInput config={fieldConfig} pathPrefix={path} />;
        if (fieldConfig.type === "array") return null;

        return null;
      })}
    </section>
  );
};
