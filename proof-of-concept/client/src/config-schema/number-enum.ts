// Form [x]

import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";

const numberEnumValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
});

// Report [ ]
export type CustomNumberEnumConfig = z.infer<
  typeof customNumberEnumConfigSchema
>;
export const customNumberEnumConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("enum"),
  options: z.object({ type: z.literal("number"), values: z.array(z.number()) }),
  validation: numberEnumValidationSchema.optional(),
});
