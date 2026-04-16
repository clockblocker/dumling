import type { TargetLanguage } from "../../../lu/universal/enums/core/language";
import type { ConcreteDumlingIdKind } from "../../types";
import { codeToLanguage, languageToCode } from "./language-codes";

type WireKindCode = "LEM" | "SEL" | "SURF-RES" | "SURF-UNRES";

const KIND_TO_WIRE = {
	Lemma: "LEM",
	ResolvedSurface: "SURF-RES",
	Selection: "SEL",
	UnresolvedSurface: "SURF-UNRES",
} as const satisfies Record<ConcreteDumlingIdKind, WireKindCode>;

const WIRE_TO_KIND = {
	LEM: "Lemma",
	SEL: "Selection",
	"SURF-RES": "ResolvedSurface",
	"SURF-UNRES": "UnresolvedSurface",
} as const satisfies Record<WireKindCode, ConcreteDumlingIdKind>;

export function encodeWireKind(kind: ConcreteDumlingIdKind): WireKindCode {
	return KIND_TO_WIRE[kind];
}

export function decodeWireKind(
	wireKind: string,
): ConcreteDumlingIdKind | undefined {
	return (WIRE_TO_KIND as Record<string, ConcreteDumlingIdKind | undefined>)[
		wireKind
	];
}

export function buildHeader(
	language: TargetLanguage,
	kind: ConcreteDumlingIdKind,
): string {
	return `ling:v1:${languageToCode(language)}:${encodeWireKind(kind)}`;
}

export function parseHeader(id: string): {
	body: string;
	kind: ConcreteDumlingIdKind;
	language: TargetLanguage;
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

	const language = codeToLanguage(languageCode);

	if (language === undefined) {
		throw new Error(
			`Unsupported language code in Dumling ID: ${languageCode}`,
		);
	}

	const kind = decodeWireKind(wireKind);

	if (kind === undefined) {
		throw new Error(`Unsupported Dumling ID kind: ${wireKind}`);
	}

	return { body, kind, language };
}
