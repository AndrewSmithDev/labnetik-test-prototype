import { CustomTestConfig } from "../type";
import { FormSection } from "./form-section";

export type FormGeneratorProps = {
  testConfig: CustomTestConfig;
};

export const FormGenerator = ({ testConfig }: FormGeneratorProps) => {
  const { sections } = testConfig;

  return (
    <>
      {Object.values(sections).map((section) => (
        <FormSection config={section} />
      ))}
    </>
  );
};
