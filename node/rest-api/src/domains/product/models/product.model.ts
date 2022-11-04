import * as z from "zod";

const ProductZod = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  inStock: z.boolean(),
});

export type Product = z.infer<typeof ProductZod>;
