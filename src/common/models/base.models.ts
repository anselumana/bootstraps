import { z } from "zod";


// todo: handle defaults (created, updated, userId)

export const withIdZod = z.object({
  id: z.string().min(1),
}).strict();

export const withUserIdZod = z.object({
  userId: z.string(),
}).strict();

export const withTimestampsZod = z.object({
  created: z.number(),
  updated: z.number(),
}).strict();

export const timestampedEntityZod = withIdZod.merge(withTimestampsZod);
export const entityZod = timestampedEntityZod.merge(withUserIdZod);


export type WithId = z.infer<typeof withIdZod>;
export type WithTimestamps = z.infer<typeof withTimestampsZod>;
export type TimestampedEntity = z.infer<typeof timestampedEntityZod>;
export type Entity = z.infer<typeof entityZod>;
