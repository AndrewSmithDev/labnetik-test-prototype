import { Typography } from "@mui/material";
import {
  CustomStringEnumConfig,
  CustomNumberEnumConfig,
  CustomArraySection,
  SectionConfig,
} from "../type";
import { ArrayInput } from "./inputs/array-input";
import { ArraySection } from "./array-section";
import {
  BooleanInput,
  ComputedInput,
  NumberEnumInput,
  NumberInput,
  StringEnumInput,
  StringInput,
} from "./inputs";
import { InlineArraySection } from "./inputs";

export type FormSectionProps = {
  config: Omit<SectionConfig, "name"> & Partial<Pick<SectionConfig, "name">>;
};

export const FormSection = ({ config }: FormSectionProps) => {
  const { label, name, fields } = config;
  const path = name;

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
        if (fieldConfig.type === "array")
          return <ArrayInput config={fieldConfig} pathPrefix={path} />;
      })}
    </section>
  );
};
