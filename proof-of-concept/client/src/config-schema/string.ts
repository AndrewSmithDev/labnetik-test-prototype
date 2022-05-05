import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";

const stringValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
  min: z
    .object({
      value: z.number(),
      message: z.string().optional(),
    })
    .optional(),
  max: z
    .object({
      value: z.number(),
      message: z.string().optional(),
    })
    .optional(),
  length: z
    .object({
      value: z.number(),
      message: z.string().optional(),
    })
    .optional(),
  email: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
  url: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
  regex: z
    .object({
      value: z.string(),
      message: z.string().optional(),
    })
    .optional(),
});

// Form [x]
// Report [ ]
export type CustomStringConfig = z.infer<typeof customStringConfigSchema>;
export const customStringConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("string"),
  validation: stringValidationSchema.optional(),
});
