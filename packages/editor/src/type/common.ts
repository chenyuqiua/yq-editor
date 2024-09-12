import { z } from "zod";

export const sizeSchema = z.object({
  width: z.number(),
  height: z.number(),
});
export type SizeType = z.infer<typeof sizeSchema>;
