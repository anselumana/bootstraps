import { z } from "zod";
import { symbolSchema } from "./symbol.model";


// post request validation model
export const postSymbolSchema = symbolSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

// put request validation model
export const putSymbolSchema = symbolSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

export type PostSymbol = z.infer<typeof postSymbolSchema>;
export type PutSymbol = z.infer<typeof putSymbolSchema>;
