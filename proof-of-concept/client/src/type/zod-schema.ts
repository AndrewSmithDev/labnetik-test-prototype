import { z } from "zod";

const nameSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Can only contain letters, numbers and underscores"
  );

export type PathToField = z.infer<typeof pathToFieldSchema>;
export const pathToFieldSchema = z.string().array();

export type Predicate = z.infer<typeof predicateSchema>;
export const predicateSchema = z.any();

export type Validation = z.infer<typeof validationSchema>;
export const validationSchema = z.any();

export type MathEquation = z.infer<typeof mathEquationSchema>;
export const mathEquationSchema = z.any();

export type Literal = z.infer<typeof literalSchema>;
export const literalSchema = z.union([z.number(), z.boolean(), z.string()]); // regex?

export type BaseCustomField = z.infer<typeof baseCustomFieldSchema>;
export const baseCustomFieldSchema = z.object({
  label: z.string(),
  name: nameSchema,
  tooltip: z.string().optional(),
  hidden: predicateSchema.optional(),
  validation: z
    .object({ predicate: nameSchema, validation: validationSchema })
    .array()
    .optional(),
  hideInReport: z.boolean().optional(),
});

export type CustomStringConfig = z.infer<typeof customStringConfigSchema>;
export const customStringConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("string"),
});

export type CustomNumberConfig = z.infer<typeof customNumberConfigSchema>;
export const customNumberConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("number"),
});

export type CustomComputedConfig = z.infer<typeof customComputedConfigSchema>;
export const customComputedConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("computed"),
  equation: mathEquationSchema,
});

export type CustomBooleanConfig = z.infer<typeof customBooleanConfigSchema>;
export const customBooleanConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("boolean"),
});

export type CustomStringEnumConfig = z.infer<
  typeof customStringEnumConfigSchema
>;
export const customStringEnumConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("enum"),
  options: z.object({ type: z.literal("string"), values: z.array(z.string()) }),
});

export type CustomNumbernumConfig = z.infer<typeof customNumbernumConfigSchema>;
export const customNumbernumConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("enum"),
  options: z.object({ type: z.literal("number"), values: z.array(z.number()) }),
});

export type CustomArrayField = z.infer<typeof customArrayFieldConfig>;
export const customArrayFieldConfig = z.union([
  customStringConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
  customNumberConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
  customBooleanConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
  customStringEnumConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
  customNumbernumConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
]);

export type CustomArraySection = z.infer<typeof customArraySectionSchema>;
export const customArraySectionSchema = z.object({
  label: z.string(),
  name: nameSchema,
  fields: z.record(customArrayFieldConfig),
});

export type CustomArrayConfig = z.infer<typeof customArrayConfigSchema>;
export const customArrayConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("array"),
  config: z.union([
    customStringConfigSchema,
    customNumberConfigSchema,
    customArraySectionSchema,
  ]),
});

export type CustomFieldConfig = z.infer<typeof customFieldConfigSchema>;
export const customFieldConfigSchema = z.union([
  customStringConfigSchema,
  customNumberConfigSchema,
  customBooleanConfigSchema,
  customStringEnumConfigSchema,
  customNumbernumConfigSchema,
  customArrayConfigSchema,
]);

export type SectionConfig = z.infer<typeof sectionConfigSchema>;
export const sectionConfigSchema = z.object({
  name: nameSchema,
  label: z.string(),
  fields: z.record(customFieldConfigSchema),
  hideInReport: z.boolean().optional(),
});

export type TestConfig = z.infer<typeof testConfigSchema>;
export const testConfigSchema = z.object({
  title: z.string(),
  stages: z.array(z.string()).optional(),
  disabledStockFields: pathToFieldSchema.array().optional(),
  sections: z.record(sectionConfigSchema),
});
