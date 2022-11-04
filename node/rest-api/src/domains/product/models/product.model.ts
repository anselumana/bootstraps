import { z } from "zod";

// base model
export const productZod = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  inStock: z.boolean(),
});

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
