import { SectionConfig } from "../type";
import { StringInput } from "./string-input";

export type FormSectionProps = {
  config: SectionConfig;
  pathPrefix?: string;
};

export const FormSection = ({ config, pathPrefix }: FormSectionProps) => {
  const { label, name, fields } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  return (
    <section>
      <h1>{label}</h1>
      {Object.values(fields).map((fieldConfig) => {
        if (fieldConfig.type === "string")
          return <StringInput config={fieldConfig} pathPrefix={path} />;
        return null;
      })}
    </section>
  );
};
