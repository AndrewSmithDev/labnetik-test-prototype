import { z } from "zod";
import { baseCustomFieldSchema } from "./base-field";
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
  validation: arrayValidationSchema.optional(),
});
