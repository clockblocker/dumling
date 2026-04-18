import type { DeprecatedLemma, DeprecatedSelection, DeprecatedSurface } from "../../../lu/public-entities";
import type { DeprecatedTargetLanguage } from "../../../lu/universal/enums/core/language";
import type {
	DeprecatedConcreteDumlingIdKind,
	DeprecatedDumlingId,
} from "../../types";
import { deprecatedGetRuntimeSchema, deprecatedIsPlainObject } from "../guards";
import type { DeprecatedParsedFeatureBag, DeprecatedParsedFeatureValue } from "../wire/feature-bag";
import { deprecatedCompactFeatureBag, deprecatedSerializeFeatureBag } from "../wire/feature-bag";
import { deprecatedBuildHeader, deprecatedEncodeWireKind } from "../wire/header";
import {
	deprecatedEscapeToken,
	deprecatedJoinTokens,
	deprecatedSerializeOptionalToken,
} from "../wire/tokens";
import { deprecatedInferConcreteDumlingIdKind } from "./infer-kind";

type EncodableValue<L extends DeprecatedTargetLanguage> =
	| DeprecatedLemma<L>
	| DeprecatedSelection<L>
	| DeprecatedSurface<L>;

export function deprecatedEncodeDumlingId<L extends DeprecatedTargetLanguage>(
	language: L,
	value: DeprecatedLemma<L>,
): DeprecatedDumlingId<"Lemma", L>;
export function deprecatedEncodeDumlingId<L extends DeprecatedTargetLanguage>(
	language: L,
	value: DeprecatedSelection<L>,
): DeprecatedDumlingId<"Selection", L>;
export function deprecatedEncodeDumlingId<L extends DeprecatedTargetLanguage>(
	language: L,
	value: DeprecatedSurface<L>,
): DeprecatedDumlingId<"Surface", L>;
export function deprecatedEncodeDumlingId<L extends DeprecatedTargetLanguage>(
	language: L,
	value: EncodableValue<L>,
): DeprecatedDumlingId<DeprecatedConcreteDumlingIdKind, L> {
	const kind = deprecatedInferConcreteDumlingIdKind(value);
	assertLanguageMatch(language, value);
	const validation = deprecatedGetRuntimeSchema(language, kind).safeParse(value);

	if (!validation.success) {
		throw new Error(
			`Invalid ${kind} for Dumling ID encoding: ${validation.error.issues
				.map((issue) => issue.message)
				.join("; ")}`,
		);
	}

	const payload = serializePayload(
		kind,
		validation.data as EncodableValue<L>,
	);
	return `${deprecatedBuildHeader(language, kind)};${payload}` as DeprecatedDumlingId<
		DeprecatedConcreteDumlingIdKind,
		L
	>;
}

function assertLanguageMatch(expected: DeprecatedTargetLanguage, value: unknown): void {
	if (
		!deprecatedIsPlainObject(value) ||
		!("language" in value) ||
		typeof value.language !== "string"
	) {
		throw new Error("Dumling ID encoding expects a language-tagged entity");
	}

	if (value.language !== expected) {
		throw new Error(
			`Dumling ID builder language mismatch: expected ${expected}, received ${value.language}`,
		);
	}
}

function serializePayload(
	kind: DeprecatedConcreteDumlingIdKind,
	value: EncodableValue<DeprecatedTargetLanguage>,
): string {
	switch (kind) {
		case "Lemma":
			return serializeLemmaPayload(value as DeprecatedLemma);
		case "Selection":
			return serializeSelectionPayload(
				value as import("../../../lu/public-entities").DeprecatedSelection,
			);
		case "Surface":
			return serializeSurfacePayload(value as DeprecatedSurface);
	}
}

function serializeSelectionPayload(
	value: DeprecatedSelection,
): string {
	return deprecatedJoinTokens([
		value.orthographicStatus,
		value.spellingRelation,
		value.selectionCoverage,
		deprecatedEscapeToken(value.spelledSelection),
		deprecatedEncodeWireKind("Surface"),
		serializeSurfacePayload(value.surface),
	]);
}

function serializeSurfacePayload(value: DeprecatedSurface): string {
	return deprecatedJoinTokens([
		...serializeSurfaceBase(value),
		serializeLemmaPayload(value.lemma),
	]);
}

function serializeSurfaceBase(value: DeprecatedSurface): string[] {
	return [
		deprecatedEscapeToken(value.normalizedFullSurface),
		value.surfaceKind,
		value.lemma.lemmaKind,
		getLemmaSubKind(value.lemma),
		value.surfaceKind === "Inflection"
			? deprecatedSerializeFeatureBag(
					(("inflectionalFeatures" in value
						? value.inflectionalFeatures
						: undefined) ?? {}) as DeprecatedParsedFeatureBag,
				)
			: "-",
	];
}

function serializeLemmaPayload(value: DeprecatedLemma): string {
	const normalizedLemma = normalizeLemma(value);

	return deprecatedJoinTokens([
		deprecatedEscapeToken(normalizedLemma.canonicalLemma),
		normalizedLemma.lemmaKind,
		getLemmaSubKind(normalizedLemma),
		deprecatedSerializeFeatureBag(getLemmaFeatures(normalizedLemma)),
		deprecatedSerializeOptionalToken(normalizedLemma.meaningInEmojis),
	]);
}

function normalizeLemma(value: DeprecatedLemma): DeprecatedLemma {
	switch (value.lemmaKind) {
		case "Lexeme":
			return {
				canonicalLemma: value.canonicalLemma,
				inherentFeatures: deprecatedCompactFeatureBag(
					value.inherentFeatures as Record<
						string,
						DeprecatedParsedFeatureValue | undefined
					>,
				),
				language: value.language,
				lemmaKind: value.lemmaKind,
				...(value.meaningInEmojis === undefined
					? {}
					: { meaningInEmojis: value.meaningInEmojis }),
				pos: value.pos,
			} as DeprecatedLemma;
		case "Morpheme":
			return {
				canonicalLemma: value.canonicalLemma,
				...("hasSepPrefix" in value && value.hasSepPrefix !== undefined
					? { hasSepPrefix: value.hasSepPrefix }
					: {}),
				...("isClosedSet" in value && value.isClosedSet !== undefined
					? { isClosedSet: value.isClosedSet }
					: {}),
				language: value.language,
				lemmaKind: value.lemmaKind,
				...(value.meaningInEmojis === undefined
					? {}
					: { meaningInEmojis: value.meaningInEmojis }),
				morphemeKind: value.morphemeKind,
			} as DeprecatedLemma;
		case "Phraseme":
			return {
				canonicalLemma: value.canonicalLemma,
				...("discourseFormulaRole" in value &&
				value.discourseFormulaRole !== undefined
					? { discourseFormulaRole: value.discourseFormulaRole }
					: {}),
				language: value.language,
				lemmaKind: value.lemmaKind,
				...(value.meaningInEmojis === undefined
					? {}
					: { meaningInEmojis: value.meaningInEmojis }),
				phrasemeKind: value.phrasemeKind,
			} as DeprecatedLemma;
	}
}

function getLemmaSubKind(value: DeprecatedLemma): string {
	switch (value.lemmaKind) {
		case "Lexeme":
			return value.pos;
		case "Morpheme":
			return value.morphemeKind;
		case "Phraseme":
			return value.phrasemeKind;
	}
}

function getLemmaFeatures(value: DeprecatedLemma): DeprecatedParsedFeatureBag {
	switch (value.lemmaKind) {
		case "Lexeme":
			return value.inherentFeatures as DeprecatedParsedFeatureBag;
		case "Morpheme":
			return deprecatedCompactFeatureBag({
				...("hasSepPrefix" in value
					? { hasSepPrefix: value.hasSepPrefix }
					: {}),
				...("isClosedSet" in value
					? { isClosedSet: value.isClosedSet }
					: {}),
			});
		case "Phraseme":
			return deprecatedCompactFeatureBag({
				...("discourseFormulaRole" in value
					? {
							discourseFormulaRole: value.discourseFormulaRole as
								| string
								| undefined,
						}
					: {}),
			});
	}
}
