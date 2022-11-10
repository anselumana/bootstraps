import { z } from "zod";

// base model
export const productZod = z.object({
  id: z.string(),
  name: z.string().min(6),
  price: z.number().min(0),
  inStock: z.boolean(),
}).strict();

// post validation model
export const postProductZod = productZod.omit({
  id: true
});

// put validation model
export const putProductZod = productZod.omit({
  id: true
});

// actual product type
export type Product = z.infer<typeof productZod>;
