import z from "zod";

export const DeprecatedIsClosedSet = z.boolean();
export type DeprecatedIsClosedSet = z.infer<typeof DeprecatedIsClosedSet>;
