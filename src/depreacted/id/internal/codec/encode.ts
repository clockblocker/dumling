import type { Lemma, Selection, Surface } from "../../../lu/public-entities";
import type { TargetLanguage } from "../../../lu/universal/enums/core/language";
import type {
	ConcreteDumlingIdKind,
	DumlingId,
} from "../../types";
import { getRuntimeSchema, isPlainObject } from "../guards";
import type { ParsedFeatureBag, ParsedFeatureValue } from "../wire/feature-bag";
import { compactFeatureBag, serializeFeatureBag } from "../wire/feature-bag";
import { buildHeader, encodeWireKind } from "../wire/header";
import {
	escapeToken,
	joinTokens,
	serializeOptionalToken,
} from "../wire/tokens";
import { inferConcreteDumlingIdKind } from "./infer-kind";

type EncodableValue<L extends TargetLanguage> =
	| Lemma<L>
	| Selection<L>
	| Surface<L>;

export function encodeDumlingId<L extends TargetLanguage>(
	language: L,
	value: Lemma<L>,
): DumlingId<"Lemma", L>;
export function encodeDumlingId<L extends TargetLanguage>(
	language: L,
	value: Selection<L>,
): DumlingId<"Selection", L>;
export function encodeDumlingId<L extends TargetLanguage>(
	language: L,
	value: Surface<L>,
): DumlingId<"Surface", L>;
export function encodeDumlingId<L extends TargetLanguage>(
	language: L,
	value: EncodableValue<L>,
): DumlingId<ConcreteDumlingIdKind, L> {
	const kind = inferConcreteDumlingIdKind(value);
	assertLanguageMatch(language, value);
	const validation = getRuntimeSchema(language, kind).safeParse(value);

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
	return `${buildHeader(language, kind)};${payload}` as DumlingId<
		ConcreteDumlingIdKind,
		L
	>;
}

function assertLanguageMatch(expected: TargetLanguage, value: unknown): void {
	if (
		!isPlainObject(value) ||
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
	kind: ConcreteDumlingIdKind,
	value: EncodableValue<TargetLanguage>,
): string {
	switch (kind) {
		case "Lemma":
			return serializeLemmaPayload(value as Lemma);
		case "Selection":
			return serializeSelectionPayload(
				value as import("../../../lu/public-entities").Selection,
			);
		case "Surface":
			return serializeSurfacePayload(value as Surface);
	}
}

function serializeSelectionPayload(
	value: Selection,
): string {
	return joinTokens([
		value.orthographicStatus,
		value.spellingRelation,
		value.selectionCoverage,
		escapeToken(value.spelledSelection),
		encodeWireKind("Surface"),
		serializeSurfacePayload(value.surface),
	]);
}

function serializeSurfacePayload(value: Surface): string {
	return joinTokens([
		...serializeSurfaceBase(value),
		serializeLemmaPayload(value.lemma),
	]);
}

function serializeSurfaceBase(value: Surface): string[] {
	return [
		escapeToken(value.normalizedFullSurface),
		value.surfaceKind,
		value.lemma.lemmaKind,
		getLemmaSubKind(value.lemma),
		value.surfaceKind === "Inflection"
			? serializeFeatureBag(
					(("inflectionalFeatures" in value
						? value.inflectionalFeatures
						: undefined) ?? {}) as ParsedFeatureBag,
				)
			: "-",
	];
}

function serializeLemmaPayload(value: Lemma): string {
	const normalizedLemma = normalizeLemma(value);

	return joinTokens([
		escapeToken(normalizedLemma.canonicalLemma),
		normalizedLemma.lemmaKind,
		getLemmaSubKind(normalizedLemma),
		serializeFeatureBag(getLemmaFeatures(normalizedLemma)),
		serializeOptionalToken(normalizedLemma.meaningInEmojis),
	]);
}

function normalizeLemma(value: Lemma): Lemma {
	switch (value.lemmaKind) {
		case "Lexeme":
			return {
				canonicalLemma: value.canonicalLemma,
				inherentFeatures: compactFeatureBag(
					value.inherentFeatures as Record<
						string,
						ParsedFeatureValue | undefined
					>,
				),
				language: value.language,
				lemmaKind: value.lemmaKind,
				...(value.meaningInEmojis === undefined
					? {}
					: { meaningInEmojis: value.meaningInEmojis }),
				pos: value.pos,
			} as Lemma;
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
			} as Lemma;
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
			} as Lemma;
	}
}

function getLemmaSubKind(value: Lemma): string {
	switch (value.lemmaKind) {
		case "Lexeme":
			return value.pos;
		case "Morpheme":
			return value.morphemeKind;
		case "Phraseme":
			return value.phrasemeKind;
	}
}

function getLemmaFeatures(value: Lemma): ParsedFeatureBag {
	switch (value.lemmaKind) {
		case "Lexeme":
			return value.inherentFeatures as ParsedFeatureBag;
		case "Morpheme":
			return compactFeatureBag({
				...("hasSepPrefix" in value
					? { hasSepPrefix: value.hasSepPrefix }
					: {}),
				...("isClosedSet" in value
					? { isClosedSet: value.isClosedSet }
					: {}),
			});
		case "Phraseme":
			return compactFeatureBag({
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
