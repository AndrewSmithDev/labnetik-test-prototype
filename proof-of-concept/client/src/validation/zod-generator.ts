import { z } from "zod";
import {
  TestConfig,
  CustomArraySection,
  CustomStringEnumConfig,
  CustomNumberEnumConfig,
  CustomArrayConfig,
  CustomInlineArraySectionConfig,
  SectionConfig,
} from "../config-schema";
import { createArraySchema } from "./array";
import { createBooleanSchema } from "./boolean";
import { createDateSchema } from "./date";
import { createDateTimeSchema } from "./date-time";
import { createInlineArraySectionSchema } from "./inline-array-section";
import { createNumberEnumSchema } from "./number-enum";
import { createNumberSchema } from "./number";
import { createStringEnumSchema } from "./string-enum";
import { createStringSchema } from "./string";

export const createArraySectionSchema = (config: CustomArraySection) => {
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
