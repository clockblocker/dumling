import z from "zod/v3";
import type { TargetLanguage } from "./enums/core/language";
import type { OrthographicStatus } from "./enums/core/selection";

export function withDumlingIdSurfaceDtoCompatibility<T extends z.ZodTypeAny>({
	language,
	orthographicStatus,
	schema,
}: {
	language: TargetLanguage;
	orthographicStatus: Exclude<OrthographicStatus, "Unknown">;
	schema: T;
}): T {
	return z.preprocess(
		(input) =>
			stripDumlingIdMetadata(input, {
				expectedLanguage: language,
				expectedDumlingKind: "Surface",
				expectedOrthographicStatus: orthographicStatus,
				keys: ["lingKind", "orthographicStatus"],
			}),
		schema,
	) as unknown as T;
}

function stripDumlingIdMetadata(
	input: unknown,
	{
		expectedLanguage,
		expectedDumlingKind,
		expectedOrthographicStatus,
		keys,
	}: {
		expectedLanguage?: TargetLanguage;
		expectedDumlingKind: "Lemma" | "Surface";
		expectedOrthographicStatus?: Exclude<OrthographicStatus, "Unknown">;
		keys: readonly string[];
	},
): unknown {
	if (!isPlainObject(input)) {
		return input;
	}

	if (input.lingKind !== expectedDumlingKind) {
		return input;
	}

	if (expectedLanguage !== undefined && input.language !== expectedLanguage) {
		return input;
	}

	if (
		expectedOrthographicStatus !== undefined &&
		input.orthographicStatus !== expectedOrthographicStatus
	) {
		return input;
	}

	const stripped = { ...input };

	for (const key of keys) {
		delete stripped[key];
	}

	return stripped;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
