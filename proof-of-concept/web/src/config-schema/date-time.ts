import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";

const dateTimeValidationSchema = z.object({
  required: z
    .object({
      message: z.string().optional(),
    })
    .optional(),
});

export type CustomDateTimeConfig = z.infer<typeof customDateTimeConfigSchema>;
export const customDateTimeConfigSchema = baseCustomFieldSchema.extend({
  type: z.literal("date-time"),
  validation: dateTimeValidationSchema.optional(),
});
