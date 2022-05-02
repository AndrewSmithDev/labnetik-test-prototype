import { Typography } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TestConfig } from "../type";
import { FormSection } from "./form-section";

export type FormGeneratorProps = {
  config: TestConfig;
};

export const FormGenerator = ({ config }: FormGeneratorProps) => {
  const { sections } = config;

  const methods = useForm();

  // const values = methods.watch();
  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const onSubmit = console.log;

  return (
    <div style={{ width: "50%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        {config.title}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {Object.values(sections).map((section) => (
            <FormSection config={section} />
          ))}
        </form>
      </FormProvider>
    </div>
  );
};
