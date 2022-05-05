import { z } from "zod";
import { nameSchema } from "./name";
import { predicateSchema } from "./predicate";

// Report [ ]
export type BaseCustomField = z.infer<typeof baseCustomFieldSchema>;
export const baseCustomFieldSchema = z.object({
  label: z.string(),
  name: nameSchema,
  tooltip: z.string().optional(),
  hidden: predicateSchema.optional(),
  hideInReport: z.boolean().optional(),
});
