import { z } from "zod";
import { customArraySectionSchema } from "./array-section";
import { customInlineArraySectionConfigSchema } from "./inline-array-section";
import { pathToFieldSchema } from "./path-to-field";
import { sectionConfigSchema } from "./section";

export type TestConfig = z.infer<typeof testConfigSchema>;
export const testConfigSchema = z.object({
  title: z.string(),
  stages: z.array(z.string()).optional(),
  disabledStockFields: pathToFieldSchema.array().optional(),
  sections: z.array(
    z.union([
      sectionConfigSchema,
      customArraySectionSchema,
      customInlineArraySectionConfigSchema,
    ])
  ),
});
