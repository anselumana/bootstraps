import { z } from "zod";


export const withIdSchema = z.object({
  id: z.string().min(1),
}).strict();

export const withUserIdSchema = z.object({
  userId: z.string(),
}).strict();

export const withTimestampsSchema = z.object({
  created: z.number().nullable(),
  updated: z.number().nullable(),
}).strict();

export const timestampedEntitySchema = withIdSchema.merge(withTimestampsSchema);
export const entitySchema = timestampedEntitySchema.merge(withUserIdSchema);


export type WithId = z.infer<typeof withIdSchema>;
export type WithTimestamps = z.infer<typeof withTimestampsSchema>;
export type TimestampedEntity = z.infer<typeof timestampedEntitySchema>;
export type Entity = z.infer<typeof entitySchema>;
