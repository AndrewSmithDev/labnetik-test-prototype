import { Typography } from "@mui/material";
import { CustomTestConfig } from "../type";
import { FormSection } from "./form-section";

export type FormGeneratorProps = {
  testConfig: CustomTestConfig;
};

export const FormGenerator = ({ testConfig }: FormGeneratorProps) => {
  const { sections } = testConfig;

  return (
    <div style={{ maxWidth: 960, margin: "32px auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Form Title
      </Typography>
      {Object.values(sections).map((section) => (
        <FormSection config={section} />
      ))}
    </div>
  );
};
