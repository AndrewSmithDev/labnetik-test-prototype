import { z } from "zod";
import {
  CustomInlineArraySectionConfig,
  CustomStringConfig,
} from "../config-schema";
import { createSectionSchema } from "./zod-generator";

const createValidation = (
  baseSchema: z.ZodArray<any>,
  validation?: CustomInlineArraySectionConfig["validation"]
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

export const createInlineArraySectionSchema = (
  config: CustomInlineArraySectionConfig
) => {
  const nestedSchema = createSectionSchema({
    ...config,
    type: "section",
  });

  const schema = z.array(nestedSchema);

  return createValidation(schema, config.validation);
};
