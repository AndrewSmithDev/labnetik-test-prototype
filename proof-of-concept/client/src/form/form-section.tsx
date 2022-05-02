import { Typography } from "@mui/material";
import { SectionConfig } from "../type";
import { BooleanInput } from "./boolean-input";
import { NumberInput } from "./number-input";
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
          return null;
        if (
          fieldConfig.type === "enum" &&
          fieldConfig.options.type === "number"
        )
          return null;
        if (fieldConfig.type === "computed") return null;
        if (fieldConfig.type === "array") return null;

        return null;
      })}
    </section>
  );
};
