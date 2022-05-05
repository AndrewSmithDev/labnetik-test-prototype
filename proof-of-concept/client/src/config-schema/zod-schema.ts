import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";
import { customComputedConfigSchema } from "./computed";
import { nameSchema } from "./name";
import { customNumberConfigSchema } from "./number";
import { customStringConfigSchema } from "./string";
import { customStringEnumConfigSchema } from "./string-enum";

export type PathToField = z.infer<typeof pathToFieldSchema>;
export const pathToFieldSchema = z.union([z.string(), z.number()]).array();

// Form [ ]
// Report [ ]
export type Predicate = z.infer<typeof predicateSchema>;
export const predicateSchema = z.any();

// Form [x]
// Report [ ]
export type CustomDateConfig = z.infer<typeof customDateConfigSchema>;
export const customDateConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("date"),
});

// Form [x]
// Report [ ]
export type CustomDateTimeConfig = z.infer<typeof customDateTimeConfigSchema>;
export const customDateTimeConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("date-time"),
});

// Form [x]
// Report [ ]
export type CustomBooleanConfig = z.infer<typeof customBooleanConfigSchema>;
export const customBooleanConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("boolean"),
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

// Form [x]
// Report [ ]
export type CustomArrayConfig = z.infer<typeof customArrayConfigSchema>;
export const customArrayConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("array"),
  config: z.union([
    customDateConfigSchema,
    customDateTimeConfigSchema,
    customStringConfigSchema,
    customNumberConfigSchema,
    customStringEnumConfigSchema,
    customNumberEnumConfigSchema,
  ]),
});

// Form [x]
// Report [ ]
export type CustomInlineArraySectionConfig = z.infer<
  typeof customInlineArraySectionConfigSchema
>;
export const customInlineArraySectionConfigSchema =
  baseCustomFieldSchema.extend({
    type: z.literal("inline-array-section"),
    fields: z.array(
      z.union([
        customDateConfigSchema,
        customDateTimeConfigSchema,
        customStringConfigSchema,
        customNumberConfigSchema,
        customComputedConfigSchema,
        customBooleanConfigSchema,
        customStringEnumConfigSchema,
        customNumberEnumConfigSchema,
      ])
    ),
  });

// Form [x]
// Report [ ]
export type CustomFieldConfig = z.infer<typeof customFieldConfigSchema>;
export const customFieldConfigSchema = z.union([
  customDateConfigSchema,
  customDateTimeConfigSchema,
  customStringConfigSchema,
  customNumberConfigSchema,
  customComputedConfigSchema,
  customBooleanConfigSchema,
  customStringEnumConfigSchema,
  customNumberEnumConfigSchema,
  customArrayConfigSchema,
]);

// Form [x]
// Report [ ]
export type SectionConfig = z.infer<typeof sectionConfigSchema>;
export const sectionConfigSchema = z.object({
  type: z.literal("section"),
  name: nameSchema,
  label: z.string(),
  fields: z.array(customFieldConfigSchema),
  hideInReport: z.boolean().optional(),
});

// Form [x]
// Report [ ]
export type CustomArraySection = z.infer<typeof customArraySectionSchema>;
export const customArraySectionSchema = z.object({
  type: z.literal("array-section"),
  showInFormPreview: z.array(pathToFieldSchema).min(1),
  name: nameSchema,
  label: z.string(),
  sections: z.array(
    z.union([sectionConfigSchema, customInlineArraySectionConfigSchema])
  ),
});

// Form [ ]
// Report [ ]
export type TestConfig = z.infer<typeof testConfigSchema>;
export const testConfigSchema = z.object({
  title: z.string(),
  stages: z.array(z.string()).optional(),
  disabledStockFields: pathToFieldSchema.array().optional(),
  sections: z.array(
    z.union([
      sectionConfigSchema,
      customArraySectionSchema,
      customInlineArraySectionConfigSchema,
    ])
  ),
});
