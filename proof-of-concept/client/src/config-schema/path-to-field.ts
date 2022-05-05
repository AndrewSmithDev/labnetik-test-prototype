import { z } from "zod";

export type PathToField = z.infer<typeof pathToFieldSchema>;
export const pathToFieldSchema = z.union([z.string(), z.number()]).array();
