import { z } from "zod";
import { CustomDateTimeConfig } from "../config-schema";

const createValidation = (
  baseSchema: z.ZodDate,
  validation?: CustomDateTimeConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodDate | z.ZodOptional<z.ZodDate> = baseSchema;
  if (!validation.required) schema = schema.optional();
  return schema;
};

export const dateTimeProcessor = (value: unknown): unknown => {
  if (value === "") return undefined;
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const dateTime = new Date(value);
    if (!isNaN(dateTime.getTime())) return dateTime;
    return value;
  }
  return value;
};

export const createDateTimeSchema = (config: CustomDateTimeConfig) => {
  const schema = z.date();

  return z.preprocess(
    dateTimeProcessor,
    createValidation(schema, config.validation)
  );
};
