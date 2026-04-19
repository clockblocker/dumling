import type { DumlingApi } from "./v2/public-types";
import { dumling as internalDumling } from "./v2/operations";

export const dumling = internalDumling as unknown as DumlingApi;
