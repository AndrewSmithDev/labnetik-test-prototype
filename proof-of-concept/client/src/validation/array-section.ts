import { z } from "zod";
import { CustomArraySection, CustomStringConfig } from "../config-schema";
import { createInlineArraySectionSchema } from "./inline-array-section";
import { createSectionSchema } from "./zod-generator";

const createValidation = (
  baseSchema: z.ZodArray<any>,
  validation?: CustomStringConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodArray<any> | z.ZodOptional<z.ZodArray<any>> = baseSchema;
  if (validation.min)
    schema = schema.min(validation.min.value, validation.min.message);
  if (validation.max)
    schema = schema.max(validation.max.value, validation.max.message);
  if (validation.length)
    schema = schema.length(validation.length.value, validation.length.message);
  if (!validation.required) schema = schema.optional();
  return schema;
};

export const createArraySectionSchema = (config: CustomArraySection) => {
  const nestedSchema = config.sections.reduce((output, section) => {
    if (section.type === "inline-array-section")
      output[section.name] = createInlineArraySectionSchema(section);
    if (section.type === "section")
      output[section.name] = createSectionSchema(section);
    return output;
  }, {} as Record<string, z.ZodTypeAny>);

  const schema = z.array(z.object(nestedSchema));

  return createValidation(schema, config.validation);
};
