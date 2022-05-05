import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";

const dateValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
});

export type CustomDateConfig = z.infer<typeof customDateConfigSchema>;
export const customDateConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("date"),
  validation: dateValidationSchema.optional(),
});
