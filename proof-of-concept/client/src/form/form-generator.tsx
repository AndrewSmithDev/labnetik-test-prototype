import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestConfig } from "../config-schema";
import { ArraySection } from "./array-section";
import { FormSection } from "./form-section";
import { InlineArraySectionInput } from "./inputs";
import { zodSchemaGenerator } from "../validation";
import { useEffect } from "react";

export type FormGeneratorProps = {
  config: TestConfig;
  onSubmit: (data: any) => void;
};

export const FormGenerator = ({ config, onSubmit }: FormGeneratorProps) => {
  const { sections } = config;

  const zodSchema = zodSchemaGenerator(config);

  const methods = useForm({ resolver: zodResolver(zodSchema) });

  const { errors } = methods.formState;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {config.title}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {Object.values(sections).map((section) => {
            if (section.type === "section")
              return <FormSection config={section} />;
            if (section.type === "inline-array-section")
              return <InlineArraySectionInput config={section} />;
            return <ArraySection config={section} />;
          })}
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
