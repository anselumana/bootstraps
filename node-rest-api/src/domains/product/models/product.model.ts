import { z } from "zod";
import { entityZod } from "../../../common/models/base.models";

const baseProductZod = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  inStock: z.boolean(),
}).strict();

export const productZod = baseProductZod.merge(entityZod);

export type Product = z.infer<typeof productZod>;
