import { z } from "zod";
import { CustomNumberConfig } from "../config";

export const numberProcessor = (value: unknown): unknown => {
  if (value === "") return undefined;
  if (typeof value === "string") {
    const number = Number.parseFloat(value);
    if (Number.isNaN(number)) return value;
    return number;
  }
  return value;
};

const createValidation = (
  baseSchema: z.ZodNumber,
  validation?: CustomNumberConfig["validation"]
) => {
  if (!validation) return baseSchema.optional();

  let schema: z.ZodNumber | z.ZodOptional<z.ZodNumber> = baseSchema;

  if (validation.gt)
    schema = schema.gt(validation.gt.value, validation.gt.message);
  if (validation.gte)
    schema = schema.gte(validation.gte.value, validation.gte.message);
  if (validation.lt)
    schema = schema.lt(validation.lt.value, validation.lt.message);
  if (validation.lte)
    schema = schema.lte(validation.lte.value, validation.lte.message);
  if (validation.int) schema = schema.int(validation.int.message);
  if (validation.positive)
    schema = schema.positive(validation.positive.message);
  if (validation.nonnegative)
    schema = schema.nonnegative(validation.nonnegative.message);
  if (validation.negative)
    schema = schema.negative(validation.negative.message);
  if (validation.nonpositive)
    schema = schema.nonpositive(validation.nonpositive.message);
  if (validation.multipleOf)
    schema = schema.multipleOf(
      validation.multipleOf.value,
      validation.multipleOf.message
    );
  if (!validation.required) schema = schema.optional();

  return schema;
};

export const createNumberSchema = (config: CustomNumberConfig) => {
  const schema = z.number();

  return z.preprocess(
    numberProcessor,
    createValidation(schema, config.validation)
  );
};
