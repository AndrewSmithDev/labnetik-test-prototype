import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestConfig } from "../config";
import { ArraySection } from "./array-section";
import { FormSection } from "./form-section";
import { InlineArraySection } from "./inputs";
import { zodSchemaGenerator } from "../validation";
import { useEffect } from "react";

export type FormGeneratorProps = {
  config: TestConfig;
};

export const FormGenerator = ({ config }: FormGeneratorProps) => {
  const { sections } = config;

  const zodSchema = zodSchemaGenerator(config);

  // console.log(zodSchema);

  const methods = useForm({ resolver: zodResolver(zodSchema) });
  // const methods = useForm();

  const { errors } = methods.formState;

  // const values = methods.watch();
  useEffect(() => {
    if (Object.keys(errors).length > 0) console.log({ errors });
  }, [errors]);

  const onSubmit = (data: any) => console.log({ data });

  return (
    <div style={{ width: "50%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        {config.title}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {Object.values(sections).map((section) => {
            if (section.type === "section")
              return <FormSection config={section} />;
            if (section.type === "inline-array-section")
              return <InlineArraySection config={section} />;
            return <ArraySection config={section} />;
          })}
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
