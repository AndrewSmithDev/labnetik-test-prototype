import { z } from "zod";
import {
  CustomArrayConfig,
  CustomNumberEnumConfig,
  CustomStringConfig,
  CustomStringEnumConfig,
} from "../config-schema";
import { createDateSchema } from "./date";
import { createDateTimeSchema } from "./date-time";
import { createNumberSchema } from "./number";
import { createNumberEnumSchema } from "./number-enum";
import { createStringEnumSchema } from "./string-enum";
import { createStringSchema } from "./string";

export const stringProcessor = (value: unknown): unknown => {
  if (value === "") return undefined;
  if (typeof value === "string") return value.trim();
  return value;
};

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

export const createArraySchema = ({
  config,
  validation,
}: CustomArrayConfig) => {
  let nestedSchema: z.ZodTypeAny = z.any();

  if (config.type === "date") nestedSchema = createDateSchema(config);
  else if (config.type === "date-time")
    nestedSchema = createDateTimeSchema(config);
  else if (config.type === "string") nestedSchema = createStringSchema(config);
  else if (config.type === "number") nestedSchema = createNumberSchema(config);
  else if (config.type === "enum" && config.options.type === "string")
    nestedSchema = createStringEnumSchema(config as CustomStringEnumConfig);
  else if (config.type === "enum" && config.options.type === "number")
    nestedSchema = createNumberEnumSchema(config as CustomNumberEnumConfig);

  const schema = z.array(nestedSchema);

  return z.preprocess(stringProcessor, createValidation(schema, validation));
};
