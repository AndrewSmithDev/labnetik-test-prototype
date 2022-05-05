import { z } from "zod";
import { CustomNumberEnumConfig } from "../config-schema";
import { numberProcessor } from "./number";

const createValidation = (
  baseSchema: z.ZodEnum<any>,
  validation?: CustomNumberEnumConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodEnum<any> | z.ZodOptional<z.ZodEnum<any>> = baseSchema;
  if (!validation.required) schema = schema.optional();
  return schema;
};

export const createNumberEnumSchema = (config: CustomNumberEnumConfig) => {
  const schema = z.enum(config.options.values as any);

  return z.preprocess(
    numberProcessor,
    createValidation(schema, config.validation)
  );
};
