import type { DeprecatedTargetLanguage } from "../../../lu/universal/enums/core/language";
import type { DeprecatedConcreteDumlingIdKind } from "../../types";
import { deprecatedCodeToLanguage, deprecatedLanguageToCode } from "./language-codes";

type WireKindCode = "LEM" | "SEL" | "SURF";

const KIND_TO_WIRE = {
	Lemma: "LEM",
	Selection: "SEL",
	Surface: "SURF",
} as const satisfies Record<DeprecatedConcreteDumlingIdKind, WireKindCode>;

const WIRE_TO_KIND = {
	LEM: "Lemma",
	SEL: "Selection",
	SURF: "Surface",
} as const satisfies Record<WireKindCode, DeprecatedConcreteDumlingIdKind>;

export function deprecatedEncodeWireKind(kind: DeprecatedConcreteDumlingIdKind): WireKindCode {
	return KIND_TO_WIRE[kind];
}

export function deprecatedDecodeWireKind(
	wireKind: string,
): DeprecatedConcreteDumlingIdKind | undefined {
	return (WIRE_TO_KIND as Record<string, DeprecatedConcreteDumlingIdKind | undefined>)[
		wireKind
	];
}

export function deprecatedBuildHeader(
	language: DeprecatedTargetLanguage,
	kind: DeprecatedConcreteDumlingIdKind,
): string {
	return `ling:v1:${deprecatedLanguageToCode(language)}:${deprecatedEncodeWireKind(kind)}`;
}

export function deprecatedParseHeader(id: string): {
	body: string;
	kind: DeprecatedConcreteDumlingIdKind;
	language: DeprecatedTargetLanguage;
} {
	const separatorIndex = id.indexOf(";");

	if (separatorIndex === -1) {
		throw new Error(`Malformed Dumling ID: ${id}`);
	}

	const header = id.slice(0, separatorIndex);
	const body = id.slice(separatorIndex + 1);
	const headerParts = header.split(":");

	if (headerParts.length !== 4) {
		throw new Error(`Malformed Dumling ID header: ${header}`);
	}

	const [namespace, version, languageCode, wireKind] = headerParts as [
		string,
		string,
		string,
		string,
	];

	if (namespace !== "ling") {
		throw new Error(`Malformed Dumling ID namespace: ${namespace}`);
	}

	if (version !== "v1") {
		throw new Error(`Unsupported Dumling ID version: ${version}`);
	}

	const language = deprecatedCodeToLanguage(languageCode);

	if (language === undefined) {
		throw new Error(
			`Unsupported language code in Dumling ID: ${languageCode}`,
		);
	}

	const kind = deprecatedDecodeWireKind(wireKind);

	if (kind === undefined) {
		throw new Error(`Unsupported Dumling ID kind: ${wireKind}`);
	}

	return { body, kind, language };
}
