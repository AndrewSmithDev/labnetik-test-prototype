import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";
import { pathToFieldSchema } from "./zod-schema";

// Report [ ]
export type MathEquation = z.infer<typeof mathEquationSchema>;
export const mathEquationSchema = z.object({
  expression: z.string(),
  scope: z.record(z.union([pathToFieldSchema, z.number()])),
});

// Form [x]
// Report [ ]
export type CustomComputedConfig = z.infer<typeof customComputedConfigSchema>;
export const customComputedConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("computed"),
  equation: mathEquationSchema,
});
