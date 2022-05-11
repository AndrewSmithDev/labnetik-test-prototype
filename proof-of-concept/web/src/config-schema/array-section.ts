import { z } from "zod";
import { customInlineArraySectionConfigSchema } from "./inline-array-section";
import { nameSchema } from "./name";
import { pathToFieldSchema } from "./path-to-field";
import { sectionConfigSchema } from "./section";

const arrayValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
  min: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
  max: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
  length: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
});

export type CustomArraySection = z.infer<typeof customArraySectionSchema>;
export const customArraySectionSchema = z.object({
  type: z.literal("array-section"),
  showInFormPreview: z.array(pathToFieldSchema).min(1),
  name: nameSchema,
  label: z.string(),
  sections: z.array(
    z.union([sectionConfigSchema, customInlineArraySectionConfigSchema])
  ),
  validation: arrayValidationSchema.optional(),
});
