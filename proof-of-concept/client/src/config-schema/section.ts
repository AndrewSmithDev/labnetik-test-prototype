import { z } from "zod";
import { customArrayConfigSchema } from "./array";
import { customBooleanConfigSchema } from "./boolean";
import { customComputedConfigSchema } from "./computed";
import { customDateConfigSchema } from "./date";
import { customDateTimeConfigSchema } from "./date-time";
import { nameSchema } from "./name";
import { customNumberConfigSchema } from "./number";
import { customNumberEnumConfigSchema } from "./number-enum";
import { customStringConfigSchema } from "./string";
import { customStringEnumConfigSchema } from "./string-enum";

export type CustomFieldConfig = z.infer<typeof customFieldConfigSchema>;
export const customFieldConfigSchema = z.union([
  customDateConfigSchema,
  customDateTimeConfigSchema,
  customStringConfigSchema,
  customNumberConfigSchema,
  customComputedConfigSchema,
  customBooleanConfigSchema,
  customStringEnumConfigSchema,
  customNumberEnumConfigSchema,
  customArrayConfigSchema,
]);

export type SectionConfig = z.infer<typeof sectionConfigSchema>;
export const sectionConfigSchema = z.object({
  type: z.literal("section"),
  name: nameSchema,
  label: z.string(),
  fields: z.array(customFieldConfigSchema),
  hideInReport: z.boolean().optional(),
});
