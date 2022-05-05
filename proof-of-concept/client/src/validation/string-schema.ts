import { z } from "zod";
import { CustomStringConfig } from "../config-schema";

export const stringProcessor = (value: unknown): unknown => {
  if (value === "") return undefined;
  if (typeof value === "string") return value.trim();
  return value;
};

const createValidation = (
  baseSchema: z.ZodString,
  validation?: CustomStringConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodString | z.ZodOptional<z.ZodString> = baseSchema;
  if (validation.min)
    schema = schema.min(validation.min.value, validation.min.message);
  if (validation.max)
    schema = schema.max(validation.max.value, validation.max.message);
  if (validation.length)
    schema = schema.length(validation.length.value, validation.length.message);
  if (validation.email) schema = schema.email(validation.email.message);
  if (validation.url) schema = schema.url(validation.url.message);
  if (validation.regex) {
    try {
      const regex = new RegExp(validation.regex.value);
      schema = schema.regex(regex, validation.regex.message);
    } catch {}
  }
  if (!validation.required) schema = schema.optional();
  return schema;
};

export const createStringSchema = (config: CustomStringConfig) => {
  const schema = z.string();

  return z.preprocess(
    stringProcessor,
    createValidation(schema, config.validation)
  );
};
