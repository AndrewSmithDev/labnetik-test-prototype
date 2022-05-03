import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TestConfig } from "../type";
import { ArraySection } from "./array-section";
import { FormSection } from "./form-section";
import { InlineArraySection } from "./inputs";

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
          {Object.values(sections).map((section) => {
            if (section.type === "section")
              return <FormSection config={section} />;
            if (section.type === "inline-array-section")
              return <InlineArraySection config={section} />;
            return <ArraySection config={section} />;
          })}
        </form>
      </FormProvider>
    </div>
  );
};
