import { z } from "zod";
import { entitySchema } from "../../../common/models/base.models";

const productBaseSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  inStock: z.boolean(),
}).strict();

export const productSchema = productBaseSchema.merge(entitySchema);

export type Product = z.infer<typeof productSchema>;
