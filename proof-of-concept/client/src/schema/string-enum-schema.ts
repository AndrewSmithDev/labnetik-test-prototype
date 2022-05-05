import { z } from "zod";
import { CustomStringEnumConfig } from "../type";
import { stringProcessor } from "./string-schema";

const createValidation = (
  baseSchema: z.ZodEnum<any>,
  validation?: CustomStringEnumConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodEnum<any> | z.ZodOptional<z.ZodEnum<any>> = baseSchema;
  if (!validation.required) schema = schema.optional();
  return schema;
};

export const createStringEnumSchema = (config: CustomStringEnumConfig) => {
  const schema = z.enum(config.options.values as any);

  return z.preprocess(
    stringProcessor,
    createValidation(schema, config.validation)
  );
};
