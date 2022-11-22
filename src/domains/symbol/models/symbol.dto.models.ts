import { z } from "zod";
import { symbolSchema } from "./symbol.model";


// get
export const getSymbolSchema = symbolSchema.omit({
  userId: true,
});

// post
export const postSymbolSchema = symbolSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

// put
export const putSymbolSchema = symbolSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});



export type GetSymbol = z.infer<typeof getSymbolSchema>;
export type PostSymbol = z.infer<typeof postSymbolSchema>;
export type PutSymbol = z.infer<typeof putSymbolSchema>;
