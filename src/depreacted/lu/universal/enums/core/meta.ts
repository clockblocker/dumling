import z from "zod";

export const IsClosedSet = z.boolean();
export type IsClosedSet = z.infer<typeof IsClosedSet>;
