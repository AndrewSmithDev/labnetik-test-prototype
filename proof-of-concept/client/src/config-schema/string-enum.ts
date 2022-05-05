import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";

const stringEnumValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
});

// Form [x]
// Report [ ]
export type CustomStringEnumConfig = z.infer<
  typeof customStringEnumConfigSchema
>;
export const customStringEnumConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("enum"),
  options: z.object({ type: z.literal("string"), values: z.array(z.string()) }),
  validation: stringEnumValidationSchema.optional(),
});
