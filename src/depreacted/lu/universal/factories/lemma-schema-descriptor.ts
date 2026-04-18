import type z from "zod/v3";
import type { DeprecatedTargetLanguage } from "../enums/core/language";

export type DeprecatedLemmaSchemaDescriptor<
	Schema extends z.ZodTypeAny,
	LanguageLiteral extends DeprecatedTargetLanguage = DeprecatedTargetLanguage,
> = {
	language: LanguageLiteral;
	schema: Schema;
};

export function deprecatedDefineLemmaSchemaDescriptor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	Schema extends z.ZodTypeAny,
>({
	language,
	schema,
}: DeprecatedLemmaSchemaDescriptor<Schema, LanguageLiteral>): DeprecatedLemmaSchemaDescriptor<
	Schema,
	LanguageLiteral
> {
	return {
		language,
		schema,
	};
}
