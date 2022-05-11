import { z } from "zod";

// Report [ ]
export type Predicate = z.infer<typeof predicateSchema>;
export const predicateSchema = z.any();
