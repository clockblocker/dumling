export type EmptyFeatures = Record<never, never>;

export type ValueOf<T> = T[keyof T];
