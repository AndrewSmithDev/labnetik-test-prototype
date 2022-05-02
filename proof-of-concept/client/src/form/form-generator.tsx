import { Typography } from "@mui/material";
import { CustomTestConfig } from "../type";
import { FormSection } from "./form-section";

export type FormGeneratorProps = {
  config: CustomTestConfig;
};

export const FormGenerator = ({ config }: FormGeneratorProps) => {
  const { sections } = config;

  return (
    <div style={{ width: "50%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Form Title
      </Typography>
      {Object.values(sections).map((section) => (
        <FormSection config={section} />
      ))}
    </div>
  );
};
