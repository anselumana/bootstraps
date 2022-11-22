import { z } from "zod";
import { exchangeSchema } from "./exchange.model";


// get
export const getExchangeSchema = exchangeSchema.omit({
  userId: true,
});

// post
export const postExchangeSchema = exchangeSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});

// put
export const putExchangeSchema = exchangeSchema.omit({
  id: true,
  userId: true,
  created: true,
  updated: true,
});



export type GetExchange = z.infer<typeof getExchangeSchema>;
export type PostExchange = z.infer<typeof postExchangeSchema>;
export type PutExchange = z.infer<typeof putExchangeSchema>;
