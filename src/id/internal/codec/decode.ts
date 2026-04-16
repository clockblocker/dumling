import { type Result, err, ok } from "neverthrow";
import type { Lemma } from "../../../lu/public-entities";
import type { TargetLanguage } from "../../../lu/universal/enums/core/language";
import type {
	ConcreteDumlingIdKind,
	DumlingIdDecodeError,
	DumlingIdValueFor,
} from "../../types";
import { lingIdDecodeError } from "../errors";
import { getRuntimeSchema } from "../guards";
import { parseFeatureBag } from "../wire/feature-bag";
import { decodeWireKind, parseHeader } from "../wire/header";
import {
	parseOptionalToken,
	splitLeadingTokens,
	unescapeToken,
} from "../wire/tokens";

export function decodeDumlingId<L extends TargetLanguage>(
	language: L,
	input: string,
): Result<DumlingIdValueFor<ConcreteDumlingIdKind, L>, DumlingIdDecodeError> {
	return decodeDumlingIdInternal(language, input);
}

export function decodeDumlingIdAs<
	L extends TargetLanguage,
	K extends ConcreteDumlingIdKind,
>(
	language: L,
	expectedKind: K,
	input: string,
): Result<DumlingIdValueFor<K, L>, DumlingIdDecodeError> {
	const decoded = decodeDumlingIdInternal(language, input);

	if (decoded.isErr()) {
		return err(decoded.error);
	}

	const header = parseHeader(input);

	if (header.kind !== expectedKind) {
		return err(
			lingIdDecodeError(
				"EntityMismatch",
				input,
				`Dumling ID entity mismatch: expected ${expectedKind}, received ${header.kind}`,
			),
		);
	}

	return ok(decoded.value as DumlingIdValueFor<K, L>);
}

function decodeDumlingIdInternal<L extends TargetLanguage>(
	language: L,
	input: string,
): Result<DumlingIdValueFor<ConcreteDumlingIdKind, L>, DumlingIdDecodeError> {
	let header: ReturnType<typeof parseHeader>;

	try {
		header = parseHeader(input);
	} catch (cause) {
		return err(classifyHeaderError(input, cause));
	}

	if (header.language !== language) {
		return err(
			lingIdDecodeError(
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
			lingIdDecodeError(
				"PayloadDecodeFailed",
				input,
				"Failed to parse Dumling ID payload",
				cause,
			),
		);
	}

	const validation = getRuntimeSchema(language, header.kind).safeParse(
		parsedValue,
	);

	if (!validation.success) {
		return err(
			lingIdDecodeError(
				"PayloadDecodeFailed",
				input,
				"Decoded Dumling ID payload does not match the entity schema",
				validation.error,
			),
		);
	}

	return ok(validation.data as DumlingIdValueFor<ConcreteDumlingIdKind, L>);
}

function classifyHeaderError(input: string, cause: unknown): DumlingIdDecodeError {
	const message =
		cause instanceof Error ? cause.message : "Malformed Dumling ID";

	if (message.startsWith("Unsupported Dumling ID version:")) {
		return lingIdDecodeError("UnsupportedVersion", input, message, cause);
	}

	if (message.startsWith("Unsupported language code")) {
		return lingIdDecodeError("UnsupportedLanguage", input, message, cause);
	}

	if (message.startsWith("Unsupported Dumling ID kind:")) {
		return lingIdDecodeError(
			"UnsupportedEntityKind",
			input,
			message,
			cause,
		);
	}

	return lingIdDecodeError("MalformedDumlingId", input, message, cause);
}

function parsePayload(
	language: TargetLanguage,
	kind: ConcreteDumlingIdKind,
	body: string,
): unknown {
	switch (kind) {
		case "Lemma":
			return parseLemmaPayload(language, body);
		case "Selection":
			return parseSelectionPayload(language, body);
		case "ResolvedSurface":
			return parseSurfacePayload(language, "ResolvedSurface", body);
		case "UnresolvedSurface":
			return parseSurfacePayload(language, "UnresolvedSurface", body);
	}
}

function parseSelectionPayload(
	language: TargetLanguage,
	body: string,
): unknown {
	const parts = splitLeadingTokens(body, 6, "selection");

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
		spelledSelection: unescapeToken(spelledSelectionToken),
		spellingRelation,
		surface: parseSelectionSurfacePayload(
			language,
			surfaceKindToken,
			surfacePayload,
		),
	};
}

function parseSurfacePayload(
	language: TargetLanguage,
	kind: "ResolvedSurface" | "UnresolvedSurface",
	body: string,
): unknown {
	const parts = splitLeadingTokens(body, 6, "surface");

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

	return {
		...parseSurfaceCore(language, {
			inflectionalFeaturesToken,
			lemmaKind,
			lemmaSubKind,
			normalizedFullSurfaceToken,
			surfaceKind,
		}),
		lemma:
			kind === "ResolvedSurface"
				? parseLemmaPayload(language, lemmaPayload)
				: { canonicalLemma: unescapeToken(lemmaPayload) },
	};
}

function parseSurfaceCore(
	language: TargetLanguage,
	{
		inflectionalFeaturesToken,
		lemmaKind,
		lemmaSubKind,
		normalizedFullSurfaceToken,
		surfaceKind,
	}: {
		inflectionalFeaturesToken: string;
		lemmaKind: string;
		lemmaSubKind: string;
		normalizedFullSurfaceToken: string;
		surfaceKind: string;
	},
) {
	return {
		discriminators: {
			lemmaKind,
			lemmaSubKind,
		},
		...(surfaceKind === "Inflection"
			? {
					inflectionalFeatures: parseFeatureBag(
						inflectionalFeaturesToken,
					),
				}
			: {}),
		language,
		normalizedFullSurface: unescapeToken(normalizedFullSurfaceToken),
		surfaceKind,
	};
}

function parseSelectionSurfacePayload(
	language: TargetLanguage,
	surfaceKindToken: string,
	surfacePayload: string,
) {
	const kind = decodeWireKind(surfaceKindToken);

	if (kind === "ResolvedSurface") {
		return parseSurfacePayload(language, "ResolvedSurface", surfacePayload);
	}

	if (kind === "UnresolvedSurface") {
		return parseSurfacePayload(
			language,
			"UnresolvedSurface",
			surfacePayload,
		);
	}

	throw new Error(
		`Selection payload must contain a surface wire kind: ${surfaceKindToken}`,
	);
}

function parseLemmaPayload(language: TargetLanguage, body: string): Lemma {
	const parts = splitLeadingTokens(body, 5, "lemma");

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
	const meaningInEmojis = parseOptionalToken(meaningToken);

	const base = {
		canonicalLemma: unescapeToken(canonicalLemmaToken),
		language,
		...(meaningInEmojis === undefined ? {} : { meaningInEmojis }),
	};

	switch (lemmaKind) {
		case "Lexeme":
			return {
				...base,
				inherentFeatures: parseFeatureBag(featuresToken),
				lemmaKind,
				pos: lemmaSubKind,
			} as Lemma;
		case "Morpheme": {
			const features = parseFeatureBag(featuresToken);
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
			} as Lemma;
		}
		case "Phraseme": {
			const features = parseFeatureBag(featuresToken);
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
			} as Lemma;
		}
		default:
			throw new Error(`Unsupported lemma kind in Dumling ID: ${lemmaKind}`);
	}
}
