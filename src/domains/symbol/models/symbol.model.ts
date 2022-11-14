import { z } from "zod";
import { entitySchema } from "../../../common/models/base.models";

const symbolBaseSchema = z.object({
  baseAsset: z.string().min(3),
  quoteAsset: z.string().min(3),
}).strict();

export const symbolSchema = symbolBaseSchema.merge(entitySchema);

export type Symbol = z.infer<typeof symbolSchema>;
