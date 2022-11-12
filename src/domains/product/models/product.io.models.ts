import { z } from "zod";
import { productZod } from "./product.model";


// post request validation model
export const postRequestProductZod = productZod.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

// put request validation model
export const putRequestProductZod = productZod.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

export type PostRequestProduct = z.infer<typeof postRequestProductZod>;
export type PutRequestProduct = z.infer<typeof putRequestProductZod>;
