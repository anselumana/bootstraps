import { z } from "zod";
import { productSchema } from "./product.model";


// post request validation model
export const postProductSchema = productSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

// put request validation model
export const putProductSchema = productSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

export type PostProduct = z.infer<typeof postProductSchema>;
export type PutProduct = z.infer<typeof putProductSchema>;
