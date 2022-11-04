import * as z from "zod";

const Product = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  inStock: z.boolean(),
});

export type Product = z.infer<typeof Product>;
