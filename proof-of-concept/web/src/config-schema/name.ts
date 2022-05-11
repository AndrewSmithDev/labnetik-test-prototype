import { z } from "zod";

export const nameSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Can only contain letters, numbers and underscores"
  );
