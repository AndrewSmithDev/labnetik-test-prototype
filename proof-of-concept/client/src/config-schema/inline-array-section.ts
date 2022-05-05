import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";
import { customBooleanConfigSchema } from "./boolean";
import { customComputedConfigSchema } from "./computed";
import { customDateConfigSchema } from "./date";
import { customDateTimeConfigSchema } from "./date-time";
import { customNumberConfigSchema } from "./number";
import { customNumberEnumConfigSchema } from "./number-enum";
import { customStringConfigSchema } from "./string";
import { customStringEnumConfigSchema } from "./string-enum";

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
    validation: arrayValidationSchema.optional(),
  });
