import { z } from "zod";
import { entitySchema } from "../../../common/models/base.models";

const symbolBaseSchema = z.object({
  baseAsset: z.string().min(2),
  quoteAsset: z.string().min(2),
  exchangeId: z.string().min(1),
}).strict();

export const symbolSchema = symbolBaseSchema.merge(entitySchema);

export type Symbol = z.infer<typeof symbolSchema>;
