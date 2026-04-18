import { type Result, err, ok } from "neverthrow";
import type { DeprecatedLemma } from "../../../lu/public-entities";
import type { DeprecatedTargetLanguage } from "../../../lu/universal/enums/core/language";
import type {
	DeprecatedConcreteDumlingIdKind,
	DeprecatedDumlingIdDecodeError,
	DeprecatedDumlingIdValueFor,
} from "../../types";
import { deprecatedLingIdDecodeError } from "../errors";
import { deprecatedGetRuntimeSchema } from "../guards";
import { deprecatedParseFeatureBag } from "../wire/feature-bag";
import { deprecatedDecodeWireKind, deprecatedParseHeader } from "../wire/header";
import {
	deprecatedParseOptionalToken,
	deprecatedSplitLeadingTokens,
	deprecatedUnescapeToken,
} from "../wire/tokens";

export function deprecatedDecodeDumlingId<L extends DeprecatedTargetLanguage>(
	language: L,
	input: string,
): Result<DeprecatedDumlingIdValueFor<DeprecatedConcreteDumlingIdKind, L>, DeprecatedDumlingIdDecodeError> {
	return decodeDumlingIdInternal(language, input);
}

export function deprecatedDecodeDumlingIdAs<
	L extends DeprecatedTargetLanguage,
	K extends DeprecatedConcreteDumlingIdKind,
>(
	language: L,
	expectedKind: K,
	input: string,
): Result<DeprecatedDumlingIdValueFor<K, L>, DeprecatedDumlingIdDecodeError> {
	const decoded = decodeDumlingIdInternal(language, input);

	if (decoded.isErr()) {
		return err(decoded.error);
	}

	const header = deprecatedParseHeader(input);

	if (header.kind !== expectedKind) {
		return err(
			deprecatedLingIdDecodeError(
				"EntityMismatch",
				input,
				`Dumling ID entity mismatch: expected ${expectedKind}, received ${header.kind}`,
			),
		);
	}

	return ok(decoded.value as DeprecatedDumlingIdValueFor<K, L>);
}

function decodeDumlingIdInternal<L extends DeprecatedTargetLanguage>(
	language: L,
	input: string,
): Result<DeprecatedDumlingIdValueFor<DeprecatedConcreteDumlingIdKind, L>, DeprecatedDumlingIdDecodeError> {
	let header: ReturnType<typeof deprecatedParseHeader>;

	try {
		header = deprecatedParseHeader(input);
	} catch (cause) {
		return err(classifyHeaderError(input, cause));
	}

	if (header.language !== language) {
		return err(
			deprecatedLingIdDecodeError(
				"LanguageMismatch",
				input,
				`Dumling ID language mismatch: expected ${language}, received ${header.language}`,
			),
		);
	}

	let parsedValue: unknown;

	try {
		parsedValue = parsePayload(language, header.kind, header.body);
	} catch (cause) {
		return err(
			deprecatedLingIdDecodeError(
				"PayloadDecodeFailed",
				input,
				"Failed to parse Dumling ID payload",
				cause,
			),
		);
	}

	const validation = deprecatedGetRuntimeSchema(language, header.kind).safeParse(
		parsedValue,
	);

	if (!validation.success) {
		return err(
			deprecatedLingIdDecodeError(
				"PayloadDecodeFailed",
				input,
				"Decoded Dumling ID payload does not match the entity schema",
				validation.error,
			),
		);
	}

	return ok(validation.data as DeprecatedDumlingIdValueFor<DeprecatedConcreteDumlingIdKind, L>);
}

function classifyHeaderError(
	input: string,
	cause: unknown,
): DeprecatedDumlingIdDecodeError {
	const message =
		cause instanceof Error ? cause.message : "Malformed Dumling ID";

	if (message.startsWith("Unsupported Dumling ID version:")) {
		return deprecatedLingIdDecodeError("UnsupportedVersion", input, message, cause);
	}

	if (message.startsWith("Unsupported language code")) {
		return deprecatedLingIdDecodeError("UnsupportedLanguage", input, message, cause);
	}

	if (message.startsWith("Unsupported Dumling ID kind:")) {
		return deprecatedLingIdDecodeError(
			"UnsupportedEntityKind",
			input,
			message,
			cause,
		);
	}

	return deprecatedLingIdDecodeError("MalformedDumlingId", input, message, cause);
}

function parsePayload(
	language: DeprecatedTargetLanguage,
	kind: DeprecatedConcreteDumlingIdKind,
	body: string,
): unknown {
	switch (kind) {
		case "Lemma":
			return parseLemmaPayload(language, body);
		case "Selection":
			return parseSelectionPayload(language, body);
		case "Surface":
			return parseSurfacePayload(language, body);
	}
}

function parseSelectionPayload(
	language: DeprecatedTargetLanguage,
	body: string,
): unknown {
	const parts = deprecatedSplitLeadingTokens(body, 6, "selection");

	if (parts.length !== 6) {
		throw new Error(`Malformed selection payload in Dumling ID: ${body}`);
	}

	const [
		orthographicStatus,
		spellingRelation,
		selectionCoverage,
		spelledSelectionToken,
		surfaceKindToken,
		surfacePayload,
	] = parts as [string, string, string, string, string, string];

	return {
		language,
		orthographicStatus,
		selectionCoverage,
		spelledSelection: deprecatedUnescapeToken(spelledSelectionToken),
		spellingRelation,
		surface: parseSelectionSurfacePayload(
			language,
			surfaceKindToken,
			surfacePayload,
		),
	};
}

function parseSurfacePayload(
	language: DeprecatedTargetLanguage,
	body: string,
): unknown {
	const parts = deprecatedSplitLeadingTokens(body, 6, "surface");

	if (parts.length !== 6) {
		throw new Error(`Malformed surface payload in Dumling ID: ${body}`);
	}

	const [
		normalizedFullSurfaceToken,
		surfaceKind,
		lemmaKind,
		lemmaSubKind,
		inflectionalFeaturesToken,
		lemmaPayload,
	] = parts as [string, string, string, string, string, string];
	const lemma = parseLemmaPayload(language, lemmaPayload);

	if (lemma.lemmaKind !== lemmaKind) {
		throw new Error("Surface payload lemma kind does not match nested lemma");
	}

	if (getLemmaSubKind(lemma) !== lemmaSubKind) {
		throw new Error(
			"Surface payload lemma subkind does not match nested lemma",
		);
	}

	return {
		...parseSurfaceCore(language, {
			inflectionalFeaturesToken,
			normalizedFullSurfaceToken,
			surfaceKind,
		}),
		lemma,
	};
}

function parseSurfaceCore(
	language: DeprecatedTargetLanguage,
	{
		inflectionalFeaturesToken,
		normalizedFullSurfaceToken,
		surfaceKind,
	}: {
		inflectionalFeaturesToken: string;
		normalizedFullSurfaceToken: string;
		surfaceKind: string;
	},
) {
	return {
		...(surfaceKind === "Inflection"
			? {
					inflectionalFeatures: deprecatedParseFeatureBag(
						inflectionalFeaturesToken,
					),
				}
			: {}),
		language,
		normalizedFullSurface: deprecatedUnescapeToken(normalizedFullSurfaceToken),
		surfaceKind,
	};
}

function parseSelectionSurfacePayload(
	language: DeprecatedTargetLanguage,
	surfaceKindToken: string,
	surfacePayload: string,
) {
	const kind = deprecatedDecodeWireKind(surfaceKindToken);

	if (kind === "Surface") {
		return parseSurfacePayload(language, surfacePayload);
	}

	throw new Error(
		`Selection payload must contain a surface wire kind: ${surfaceKindToken}`,
	);
}

function parseLemmaPayload(language: DeprecatedTargetLanguage, body: string): DeprecatedLemma {
	const parts = deprecatedSplitLeadingTokens(body, 5, "lemma");

	if (parts.length !== 5) {
		throw new Error(`Malformed lemma payload in Dumling ID: ${body}`);
	}

	const [
		canonicalLemmaToken,
		lemmaKind,
		lemmaSubKind,
		featuresToken,
		meaningToken,
	] = parts as [string, string, string, string, string];
	const meaningInEmojis = deprecatedParseOptionalToken(meaningToken);

	const base = {
		canonicalLemma: deprecatedUnescapeToken(canonicalLemmaToken),
		language,
		...(meaningInEmojis === undefined ? {} : { meaningInEmojis }),
	};

	switch (lemmaKind) {
		case "Lexeme":
			return {
				...base,
				inherentFeatures: deprecatedParseFeatureBag(featuresToken),
				lemmaKind,
				pos: lemmaSubKind,
			} as DeprecatedLemma;
		case "Morpheme": {
			const features = deprecatedParseFeatureBag(featuresToken);
			return {
				...base,
				...("hasSepPrefix" in features
					? { hasSepPrefix: features.hasSepPrefix as string }
					: {}),
				...("isClosedSet" in features
					? { isClosedSet: features.isClosedSet }
					: {}),
				lemmaKind,
				morphemeKind: lemmaSubKind,
			} as DeprecatedLemma;
		}
		case "Phraseme": {
			const features = deprecatedParseFeatureBag(featuresToken);
			return {
				...base,
				...("discourseFormulaRole" in features
					? {
							discourseFormulaRole:
								features.discourseFormulaRole as string,
						}
					: {}),
				lemmaKind,
				phrasemeKind: lemmaSubKind,
			} as DeprecatedLemma;
		}
		default:
			throw new Error(`Unsupported lemma kind in Dumling ID: ${lemmaKind}`);
	}
}

function getLemmaSubKind(lemma: DeprecatedLemma): string {
	switch (lemma.lemmaKind) {
		case "Lexeme":
			return lemma.pos;
		case "Morpheme":
			return lemma.morphemeKind;
		case "Phraseme":
			return lemma.phrasemeKind;
	}
}
