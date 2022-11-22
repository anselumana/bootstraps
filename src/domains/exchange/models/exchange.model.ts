import { z } from "zod";
import { entitySchema } from "../../../common/models/base.models";

const exchangeBaseSchema = z.object({
  name: z.string().min(1),
}).strict();

export const exchangeSchema = exchangeBaseSchema.merge(entitySchema);

export type Exchange = z.infer<typeof exchangeSchema>;
