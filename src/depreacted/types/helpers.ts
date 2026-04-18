export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type PrettifyDeep<T> = T extends
	| string
	| number
	| boolean
	| bigint
	| symbol
	| null
	| undefined
	| ((...args: never[]) => unknown)
	? T
	: T extends readonly unknown[]
		? {
				[K in keyof T]: PrettifyDeep<T[K]>;
			}
		: T extends object
			? {
					[K in keyof T]: PrettifyDeep<T[K]>;
				} & {}
			: T;
