import { z } from "zod";
import {
  TestConfig,
  CustomDateConfig,
  CustomDateTimeConfig,
  CustomStringConfig,
  CustomNumberConfig,
  CustomArraySection,
  CustomBooleanConfig,
  CustomStringEnumConfig,
  CustomNumberEnumConfig,
  CustomArrayConfig,
  CustomInlineArraySectionConfig,
  SectionConfig,
} from "../config-schema";
import { numberProcessor, createNumberSchema } from "./number-schema";
import { createStringEnumSchema } from "./string-enum-schema";
import { createStringSchema } from "./string-schema";

const dateProcessor = (value: unknown): unknown => {
  if (value === "") return undefined;
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;
    return value;
  }
  return value;
};

export const createDateSchema = (
  config: CustomDateConfig | CustomDateTimeConfig
) => {
  const schema = z.date().optional();
  return z.preprocess(dateProcessor, schema);
};

export const createDateTimeSchema = (config: CustomDateTimeConfig) => {
  const schema = z.date().optional();
  return z.preprocess(dateProcessor, schema);
};

export const createBooleanSchema = (config: CustomBooleanConfig) => {
  return z.boolean().optional();
};

export const createNumberEnumSchema = (config: CustomNumberEnumConfig) => {
  const schema = z.enum(config.options.values as any).optional();
  return z.preprocess(numberProcessor, schema);
};

export const createArraySchema = ({ config }: CustomArrayConfig) => {
  let nestedSchema: z.ZodTypeAny;

  if (config.type === "date") nestedSchema = createDateSchema(config);
  else if (config.type === "date-time")
    nestedSchema = createDateTimeSchema(config);
  else if (config.type === "string") nestedSchema = createStringSchema(config);
  else if (config.type === "number") nestedSchema = createNumberSchema(config);
  else if (config.type === "enum" && config.options.type === "string")
    nestedSchema = createStringEnumSchema(config as CustomStringEnumConfig);
  // if (config.type === "enum" && config.options.type === "number")
  else nestedSchema = createNumberEnumSchema(config as CustomNumberEnumConfig);

  return z.array(nestedSchema).optional();
};

export const createArraySectionSchema = (config: CustomArraySection) => {
  return z.any().optional();
};

export const createInlineArraySectionSchema = (
  config: CustomInlineArraySectionConfig
) => {
  return z.any().optional();
};

export const createSectionSchema = (config: SectionConfig) => {
  const fieldSchemas = config.fields.reduce((output, field) => {
    let nestedSchema: z.ZodTypeAny;

    if (field.type === "date") nestedSchema = createDateSchema(field);
    else if (field.type === "date-time")
      nestedSchema = createDateTimeSchema(field);
    else if (field.type === "string") nestedSchema = createStringSchema(field);
    else if (field.type === "number") nestedSchema = createNumberSchema(field);
    else if (field.type === "boolean")
      nestedSchema = createBooleanSchema(field);
    else if (field.type === "array") nestedSchema = createArraySchema(field);
    else if (field.type === "enum" && field.options.type === "string")
      nestedSchema = createStringEnumSchema(field as CustomStringEnumConfig);
    else if (field.type === "enum" && field.options.type === "number")
      nestedSchema = createNumberEnumSchema(field as CustomNumberEnumConfig);
    else if (field.type === "computed") return output;
    else throw new Error("Unknown field type:" + (field as any).type);

    output[field.name] = nestedSchema;
    return output;
  }, {} as Record<string, z.ZodTypeAny>);

  return z.object(fieldSchemas).optional();
};

export const zodSchemaGenerator = (config: TestConfig) => {
  const sectionSchemas = config.sections.reduce((output, section) => {
    let nestedSchema: z.ZodTypeAny;

    if (section.type === "section") nestedSchema = createSectionSchema(section);
    else if (section.type === "array-section")
      nestedSchema = createArraySectionSchema(section);
    else if (section.type === "inline-array-section")
      nestedSchema = createInlineArraySectionSchema(section);
    else throw new Error("invalid section type:" + (section as any).type);

    output[section.name] = nestedSchema;
    return output;
  }, {} as Record<string, z.ZodTypeAny>);

  return z.object(sectionSchemas).optional();
};