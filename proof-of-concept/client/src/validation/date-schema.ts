import { z } from "zod";
import { CustomDateConfig } from "../config-schema";
import { dateTimeProcessor } from "./date-time-schema";

const createValidation = (
  baseSchema: z.ZodDate,
  validation?: CustomDateConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodDate | z.ZodOptional<z.ZodDate> = baseSchema;
  if (!validation.required) schema = schema.optional();
  return schema;
};

export const createDateSchema = (config: CustomDateConfig) => {
  const schema = z.date();

  return z.preprocess(
    dateTimeProcessor,
    createValidation(schema, config.validation)
  );
};
