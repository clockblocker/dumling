export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Replace<T, K extends keyof T, V> = Prettify<
	Omit<T, K> & { [P in K]: V }
>;

export type ReplaceMany<
	T,
	R extends Partial<Record<keyof T, unknown>>,
> = Prettify<Omit<T, keyof R> & R>;
