import { z } from "zod";

const nameSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Can only contain letters, numbers and underscores"
  );

export type PathToField = z.infer<typeof pathToFieldSchema>;
export const pathToFieldSchema = z.union([z.string(), z.number()]).array();

// Form [ ]
// Report [ ]
export type Predicate = z.infer<typeof predicateSchema>;
export const predicateSchema = z.any();

// Form [ ]
// Report [ ]
export type Validation = z.infer<typeof validationSchema>;
export const validationSchema = z.any();

// Form [x]
// Report [ ]
export type MathEquation = z.infer<typeof mathEquationSchema>;
export const mathEquationSchema = z.object({
  expression: z.string(),
  scope: z.record(z.union([pathToFieldSchema, z.number()])),
});

// Form [x]
// Report [ ]
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

// Form [x]
// Report [ ]
export type CustomStringConfig = z.infer<typeof customStringConfigSchema>;
export const customStringConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("string"),
});

// Form [x]
// Report [ ]
export type CustomNumberConfig = z.infer<typeof customNumberConfigSchema>;
export const customNumberConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("number"),
});

// Form [x]
// Report [ ]
export type CustomComputedConfig = z.infer<typeof customComputedConfigSchema>;
export const customComputedConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("computed"),
  equation: mathEquationSchema,
});

// Form [x]
// Report [ ]
export type CustomBooleanConfig = z.infer<typeof customBooleanConfigSchema>;
export const customBooleanConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("boolean"),
});

// Form [x]
// Report [ ]
export type CustomStringEnumConfig = z.infer<
  typeof customStringEnumConfigSchema
>;
export const customStringEnumConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("enum"),
  options: z.object({ type: z.literal("string"), values: z.array(z.string()) }),
});

// Form [x]
// Report [ ]
export type CustomNumberEnumConfig = z.infer<
  typeof customNumberEnumConfigSchema
>;
export const customNumberEnumConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("enum"),
  options: z.object({ type: z.literal("number"), values: z.array(z.number()) }),
});

// Form [ ]
// Report [ ]
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
  customNumberEnumConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
  customComputedConfigSchema.extend({
    showInFormPreview: z.boolean().optional(),
  }),
]);

// Form [ ]
// Report [ ]
export type CustomArraySection = z.infer<typeof customArraySectionSchema>;
export const customArraySectionSchema = z.object({
  type: z.literal("array-section"),
  name: nameSchema,
  label: z.string(),
  fields: z.record(customArrayFieldConfig),
});

// Form [ ]
// Report [ ]
export type CustomArrayConfig = z.infer<typeof customArrayConfigSchema>;
export const customArrayConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("array"),
  config: z.union([
    customStringConfigSchema,
    customNumberConfigSchema,
    customStringEnumConfigSchema,
    customNumberEnumConfigSchema,
  ]),
});

// Form [x]
// Report [ ]
export type CustomFieldConfig = z.infer<typeof customFieldConfigSchema>;
export const customFieldConfigSchema = z.union([
  customStringConfigSchema,
  customNumberConfigSchema,
  customComputedConfigSchema,
  customBooleanConfigSchema,
  customStringEnumConfigSchema,
  customNumberEnumConfigSchema,
  customArraySectionSchema,
  customArrayConfigSchema,
]);

// Form [x]
// Report [ ]
export type SectionConfig = z.infer<typeof sectionConfigSchema>;
export const sectionConfigSchema = z.object({
  type: z.literal("section"),
  name: nameSchema,
  label: z.string(),
  fields: z.record(customFieldConfigSchema),
  hideInReport: z.boolean().optional(),
});

// Form [ ]
// Report [ ]
export type TestConfig = z.infer<typeof testConfigSchema>;
export const testConfigSchema = z.object({
  title: z.string(),
  stages: z.array(z.string()).optional(),
  disabledStockFields: pathToFieldSchema.array().optional(),
  sections: z.record(z.union([sectionConfigSchema, customArraySectionSchema])),
});
