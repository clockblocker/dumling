import type { z } from "zod/v3";
import { schema, runtimeSchemas } from "./schema-registry";
import { NotImplementedYetError } from "./errors";
import type {
	ApiResult,
	DumlingApi,
	EntityKind,
	IdDecodeError,
	IdDecodeErrorCode,
	Lemma,
	LemmaDescriptor,
	ParseError,
	Selection,
	SelectionDescriptor,
	Surface,
	SurfaceDescriptor,
} from "../public-types";

type DeLemma = Lemma<"de">;
type DeSurface = Surface<"de">;
type DeSelection = Selection<"de">;
type DeEntity = DeLemma | DeSurface | DeSelection;

type DeDecodeResult = {
	entityKind: EntityKind;
	data: DeEntity;
};

function languageNotImplementedError(language: "en" | "he") {
	return {
		code: "LanguageNotImplemented" as const,
		language,
		message: `dumling.${language} is not implemented yet`,
	};
}

function invalidParseResult(language: "de", error: z.ZodError): ApiResult<never, ParseError> {
	return {
		success: false,
		error: {
			code: "InvalidInput",
			language,
			message: "Input did not match the requested Dumling schema",
			issues: error.issues.map((issue) => {
				const path = issue.path.length > 0 ? issue.path.join(".") : "input";
				return `${path}: ${issue.message}`;
			}),
		},
	};
}

function parseWithSchema<T>(
	language: "de",
	runtimeSchema: z.ZodType<T>,
	input: unknown,
): ApiResult<T, ParseError> {
	const parsed = runtimeSchema.safeParse(input);

	if (!parsed.success) {
		return invalidParseResult(language, parsed.error);
	}

	return {
		success: true,
		data: parsed.data,
	};
}

function extractLemma(value: DeEntity): DeLemma {
	if ("canonicalLemma" in value) {
		return value;
	}

	if ("surfaceKind" in value) {
		return value.lemma;
	}

	return value.surface.lemma;
}

function describeLemma(value: DeEntity): LemmaDescriptor<"de", DeLemma["lemmaKind"], DeLemma["lemmaSubKind"]> {
	const lemma = extractLemma(value);

	return {
		language: "de",
		lemmaKind: lemma.lemmaKind,
		lemmaSubKind: lemma.lemmaSubKind,
	};
}

function describeSurface(
	value: DeEntity,
): SurfaceDescriptor<"de", DeSurface["surfaceKind"], DeSurface["lemma"]["lemmaKind"], DeSurface["lemma"]["lemmaSubKind"]> {
	if ("surfaceKind" in value) {
		return {
			language: "de",
			surfaceKind: value.surfaceKind,
			lemmaKind: value.lemma.lemmaKind,
			lemmaSubKind: value.lemma.lemmaSubKind,
		};
	}

	if ("surface" in value) {
		return {
			language: "de",
			surfaceKind: value.surface.surfaceKind,
			lemmaKind: value.surface.lemma.lemmaKind,
			lemmaSubKind: value.surface.lemma.lemmaSubKind,
		};
	}

	return {
		language: "de",
		surfaceKind: "Lemma",
		lemmaKind: value.lemmaKind,
		lemmaSubKind: value.lemmaSubKind,
	};
}

function describeSelection(
	value: DeEntity,
): SelectionDescriptor<
	"de",
	DeSelection["orthographicStatus"],
	DeSelection["surface"]["surfaceKind"],
	DeSelection["surface"]["lemma"]["lemmaKind"],
	DeSelection["surface"]["lemma"]["lemmaSubKind"]
> {
	if ("surface" in value) {
		return {
			language: "de",
			orthographicStatus: value.orthographicStatus,
			surfaceKind: value.surface.surfaceKind,
			lemmaKind: value.surface.lemma.lemmaKind,
			lemmaSubKind: value.surface.lemma.lemmaSubKind,
		};
	}

	if ("surfaceKind" in value) {
		return {
			language: "de",
			orthographicStatus: "Standard",
			surfaceKind: value.surfaceKind,
			lemmaKind: value.lemma.lemmaKind,
			lemmaSubKind: value.lemma.lemmaSubKind,
		};
	}

	return {
		language: "de",
		orthographicStatus: "Standard",
		surfaceKind: "Lemma",
		lemmaKind: value.lemmaKind,
		lemmaSubKind: value.lemmaSubKind,
	};
}

function inferEntityKind(value: DeEntity): EntityKind {
	if ("surface" in value) {
		return "Selection";
	}

	if ("surfaceKind" in value) {
		return "Surface";
	}

	return "Lemma";
}

function encodeBase64Url(value: string) {
	return Buffer.from(value, "utf8")
		.toString("base64")
		.replaceAll("+", "-")
		.replaceAll("/", "_")
		.replace(/=+$/u, "");
}

function decodeBase64Url(value: string) {
	const padded = `${value}${"=".repeat((4 - (value.length % 4 || 4)) % 4)}`
		.replaceAll("-", "+")
		.replaceAll("_", "/");
	return Buffer.from(padded, "base64").toString("utf8");
}

function idError(code: IdDecodeErrorCode, message: string): IdDecodeError {
	return { code, message };
}

function makeNotImplementedLanguageApi(language: "en" | "he") {
	const failParse = () =>
		({
			success: false,
			error: languageNotImplementedError(language),
		}) as const;

	const throwNotImplemented = () => {
		throw new NotImplementedYetError(language);
	};

	return {
		create: {
			lemma: throwNotImplemented,
			surface: {
				lemma: throwNotImplemented,
				inflection: throwNotImplemented,
			},
			selection: {
				standard: throwNotImplemented,
				typo: throwNotImplemented,
			},
		},
		convert: {
			lemma: {
				toSurface: throwNotImplemented,
				toSelection: throwNotImplemented,
			},
			surface: {
				toSelection: throwNotImplemented,
			},
		},
		extract: {
			lemma: throwNotImplemented,
		},
		parse: {
			lemma: failParse,
			surface: failParse,
			selection: failParse,
		},
		describe: {
			as: {
				lemma: throwNotImplemented,
				surface: throwNotImplemented,
				selection: throwNotImplemented,
			},
		},
		id: {
			encode: throwNotImplemented,
			decode: failParse,
			decodeAs: failParse,
		},
	};
}

export const dumling = {
	de: {
		create: {
			lemma(input: Omit<DeLemma, "language"> & { language?: unknown }) {
				return {
					language: "de",
					canonicalLemma: input.canonicalLemma,
					lemmaKind: input.lemmaKind,
					lemmaSubKind: input.lemmaSubKind,
					inherentFeatures: input.inherentFeatures ?? {},
					meaningInEmojis: input.meaningInEmojis,
				} as DeLemma;
			},
			surface: {
				lemma(
					input: Omit<Extract<DeSurface, { surfaceKind: "Lemma" }>, "language" | "surfaceKind"> & {
						language?: unknown;
						surfaceKind?: unknown;
					},
				) {
					return {
						language: "de",
						normalizedFullSurface: input.normalizedFullSurface,
						surfaceKind: "Lemma",
						lemma: input.lemma,
					} as Extract<DeSurface, { surfaceKind: "Lemma" }>;
				},
				inflection(
					input: Omit<Extract<DeSurface, { surfaceKind: "Inflection" }>, "language" | "surfaceKind"> & {
						language?: unknown;
						surfaceKind?: unknown;
					},
				) {
					return {
						language: "de",
						normalizedFullSurface: input.normalizedFullSurface,
						surfaceKind: "Inflection",
						lemma: input.lemma,
						inflectionalFeatures: input.inflectionalFeatures,
					} as Extract<DeSurface, { surfaceKind: "Inflection" }>;
				},
			},
			selection: {
				standard(
					input: Omit<Extract<DeSelection, { orthographicStatus: "Standard" }>, "language" | "orthographicStatus"> & {
						language?: unknown;
						orthographicStatus?: unknown;
					},
				) {
					return {
						language: "de",
						orthographicStatus: "Standard",
						selectionCoverage: input.selectionCoverage,
						spelledSelection: input.spelledSelection,
						spellingRelation: input.spellingRelation,
						surface: input.surface,
					} as Extract<DeSelection, { orthographicStatus: "Standard" }>;
				},
				typo(
					input: Omit<Extract<DeSelection, { orthographicStatus: "Typo" }>, "language" | "orthographicStatus"> & {
						language?: unknown;
						orthographicStatus?: unknown;
					},
				) {
					return {
						language: "de",
						orthographicStatus: "Typo",
						selectionCoverage: input.selectionCoverage,
						spelledSelection: input.spelledSelection,
						spellingRelation: input.spellingRelation,
						surface: input.surface,
					} as Extract<DeSelection, { orthographicStatus: "Typo" }>;
				},
			},
		},
		convert: {
			lemma: {
				toSurface(lemma: DeLemma) {
					return {
						language: "de",
						normalizedFullSurface: lemma.canonicalLemma,
						surfaceKind: "Lemma",
						lemma,
					} as Extract<DeSurface, { surfaceKind: "Lemma" }>;
				},
				toSelection(
					lemma: DeLemma,
					options: Partial<
						Pick<
							DeSelection,
							| "orthographicStatus"
							| "selectionCoverage"
							| "spelledSelection"
							| "spellingRelation"
						>
					> = {},
				) {
					return dumling.de.convert.surface.toSelection(
						dumling.de.convert.lemma.toSurface(lemma),
						options,
					);
				},
			},
			surface: {
				toSelection(
					surface: DeSurface,
					options: Partial<
						Pick<
							DeSelection,
							| "orthographicStatus"
							| "selectionCoverage"
							| "spelledSelection"
							| "spellingRelation"
						>
					> = {},
				) {
					return {
						language: "de",
						orthographicStatus: options.orthographicStatus ?? "Standard",
						selectionCoverage: options.selectionCoverage ?? "Full",
						spelledSelection:
							options.spelledSelection ?? surface.normalizedFullSurface,
						spellingRelation: options.spellingRelation ?? "Canonical",
						surface,
					} as DeSelection;
				},
			},
		},
		extract: {
			lemma: extractLemma,
		},
		parse: {
			lemma(input: unknown) {
				return parseWithSchema("de", runtimeSchemas.de.lemma, input);
			},
			surface(input: unknown) {
				return parseWithSchema("de", runtimeSchemas.de.surface, input);
			},
			selection(input: unknown) {
				return parseWithSchema("de", runtimeSchemas.de.selection, input);
			},
		},
		describe: {
			as: {
				lemma: describeLemma,
				surface: describeSurface,
				selection: describeSelection,
			},
		},
		id: {
			encode(value: DeEntity) {
				return `dumling:v2:${encodeBase64Url(
					JSON.stringify({
						v: 2,
						entityKind: inferEntityKind(value),
						language: "de",
						data: value,
					}),
				)}`;
			},
			decode(id: string): ApiResult<DeDecodeResult, IdDecodeError> {
				if (!id.startsWith("dumling:v2:")) {
					return {
						success: false,
						error: idError("MalformedId", "Expected a dumling:v2: ID"),
					};
				}

				let payloadText: string;
				try {
					payloadText = decodeBase64Url(id.slice("dumling:v2:".length));
				} catch {
					return {
						success: false,
						error: idError("MalformedId", "ID payload is not valid base64url"),
					};
				}

				let payload: unknown;
				try {
					payload = JSON.parse(payloadText);
				} catch {
					return {
						success: false,
						error: idError("MalformedId", "ID payload is not valid JSON"),
					};
				}

				if (
					typeof payload !== "object" ||
					payload === null ||
					!("v" in payload) ||
					!("entityKind" in payload) ||
					!("language" in payload) ||
					!("data" in payload)
				) {
					return {
						success: false,
						error: idError("InvalidPayload", "ID payload shape is invalid"),
					};
				}

				const { v, entityKind, language, data } = payload as {
					data: unknown;
					entityKind: EntityKind;
					language: string;
					v: number;
				};

				if (v !== 2) {
					return {
						success: false,
						error: idError(
							"UnsupportedIdVersion",
							`Unsupported Dumling ID version: ${String(v)}`,
						),
					};
				}

				if (language !== "de") {
					return {
						success: false,
						error: idError(
							"LanguageMismatch",
							`Expected ID for de, received ${language}`,
						),
					};
				}

				const parseResult =
					entityKind === "Lemma"
						? dumling.de.parse.lemma(data)
						: entityKind === "Surface"
							? dumling.de.parse.surface(data)
							: dumling.de.parse.selection(data);

				if (!parseResult.success) {
					return {
						success: false,
						error: idError("InvalidPayload", parseResult.error.message),
					};
				}

				return {
					success: true,
					data: {
						entityKind,
						data: parseResult.data as DeEntity,
					},
				};
			},
			decodeAs<K extends EntityKind>(kind: K, id: string) {
				const decoded = dumling.de.id.decode(id);

				if (!decoded.success) {
					return decoded;
				}

				if (decoded.data.entityKind !== kind) {
					return {
						success: false,
						error: idError(
							"EntityMismatch",
							`Expected ${kind}, received ${decoded.data.entityKind}`,
						),
					};
				}

				return {
					success: true,
					data: decoded.data.data as Extract<
						DeEntity,
						K extends "Lemma"
							? { canonicalLemma: string }
							: K extends "Surface"
								? { surfaceKind: string }
								: { surface: unknown }
					>,
				};
			},
		},
	},
	en: makeNotImplementedLanguageApi("en"),
	he: makeNotImplementedLanguageApi("he"),
} as unknown as DumlingApi;

export { schema };
