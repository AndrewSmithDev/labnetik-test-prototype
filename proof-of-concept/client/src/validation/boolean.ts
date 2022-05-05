import { z } from "zod";
import { CustomBooleanConfig } from "../config-schema";

export const createBooleanSchema = (config: CustomBooleanConfig) => {
  return z.boolean().optional();
};
