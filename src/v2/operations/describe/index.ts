import type {
	LanguageApi,
	Lemma,
	Selection,
	Surface,
} from "../../public-types";
import { extractLemma } from "../shared/entity-accessors";

type DeDescribeOperations = LanguageApi<"de">["describe"];
type DeEntityValue = Lemma<"de"> | Surface<"de"> | Selection<"de">;
type DeLemmaDescriptorResult = ReturnType<DeDescribeOperations["as"]["lemma"]>;
type DeSurfaceDescriptorResult = ReturnType<DeDescribeOperations["as"]["surface"]>;
type DeSelectionDescriptorResult = ReturnType<DeDescribeOperations["as"]["selection"]>;

function describeLemma(value: DeEntityValue): DeLemmaDescriptorResult {
	const lemma = extractLemma(value);

	return {
		language: lemma.language,
		lemmaKind: lemma.lemmaKind,
		lemmaSubKind: lemma.lemmaSubKind,
	} as DeLemmaDescriptorResult;
}

function describeSurface(value: DeEntityValue): DeSurfaceDescriptorResult {
	if ("surfaceKind" in value) {
		return {
			language: value.language,
			surfaceKind: value.surfaceKind,
			lemmaKind: value.lemma.lemmaKind,
			lemmaSubKind: value.lemma.lemmaSubKind,
		} as DeSurfaceDescriptorResult;
	}

	if ("surface" in value) {
		return {
			language: value.language,
			surfaceKind: value.surface.surfaceKind,
			lemmaKind: value.surface.lemma.lemmaKind,
			lemmaSubKind: value.surface.lemma.lemmaSubKind,
		} as DeSurfaceDescriptorResult;
	}

	return {
		language: value.language,
		surfaceKind: "Lemma",
		lemmaKind: value.lemmaKind,
		lemmaSubKind: value.lemmaSubKind,
	} as DeSurfaceDescriptorResult;
}

function describeSelection(value: DeEntityValue): DeSelectionDescriptorResult {
	if ("surface" in value) {
		return {
			language: value.language,
			orthographicStatus: value.orthographicStatus,
			surfaceKind: value.surface.surfaceKind,
			lemmaKind: value.surface.lemma.lemmaKind,
			lemmaSubKind: value.surface.lemma.lemmaSubKind,
		} as DeSelectionDescriptorResult;
	}

	if ("surfaceKind" in value) {
		return {
			language: value.language,
			orthographicStatus: "Standard",
			surfaceKind: value.surfaceKind,
			lemmaKind: value.lemma.lemmaKind,
			lemmaSubKind: value.lemma.lemmaSubKind,
		} as DeSelectionDescriptorResult;
	}

	return {
		language: value.language,
		orthographicStatus: "Standard",
		surfaceKind: "Lemma",
		lemmaKind: value.lemmaKind,
		lemmaSubKind: value.lemmaSubKind,
	} as DeSelectionDescriptorResult;
}

export function buildDeDescribeOperations(): DeDescribeOperations {
	return {
		as: {
			lemma: describeLemma,
			surface: describeSurface,
			selection: describeSelection,
		},
	};
}
