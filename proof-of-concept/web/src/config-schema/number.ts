import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";

const numberValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
  gt: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
  gte: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
  lt: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
  lte: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
  int: z.object({ message: z.string().optional() }).optional(),
  positive: z.object({ message: z.string().optional() }).optional(),
  nonnegative: z.object({ message: z.string().optional() }).optional(),
  negative: z.object({ message: z.string().optional() }).optional(),
  nonpositive: z.object({ message: z.string().optional() }).optional(),
  multipleOf: z
    .object({ value: z.number(), message: z.string().optional() })
    .optional(),
});

// Form [x]
// Report [ ]
export type CustomNumberConfig = z.infer<typeof customNumberConfigSchema>;
export const customNumberConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("number"),
  validation: numberValidationSchema.optional(),
});
