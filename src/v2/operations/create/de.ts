import type {
	InherentFeaturesFor,
	Lemma,
	Selection,
	Surface,
} from "../../public-types";

export function buildDeCreateOperations() {
	const operations = {
		lemma<
			LK extends Lemma<"de">["lemmaKind"],
			LSK extends Lemma<"de", LK>["lemmaSubKind"],
		>(input: {
			canonicalLemma: string;
			lemmaKind: LK;
			lemmaSubKind: LSK;
			inherentFeatures: InherentFeaturesFor<"de", LK, LSK>;
			meaningInEmojis: string;
			language?: unknown;
		}) {
			return {
				language: "de",
				canonicalLemma: input.canonicalLemma,
				lemmaKind: input.lemmaKind,
				lemmaSubKind: input.lemmaSubKind,
				inherentFeatures: input.inherentFeatures ?? {},
				meaningInEmojis: input.meaningInEmojis,
			} as Lemma<"de", LK, LSK>;
		},
		surface: {
			lemma<T extends Surface<"de", "Lemma">>(
				input: Omit<T, "language" | "surfaceKind"> & {
					language?: unknown;
					surfaceKind?: unknown;
				},
			) {
				return {
					language: "de",
					normalizedFullSurface: input.normalizedFullSurface,
					surfaceKind: "Lemma",
					lemma: input.lemma,
				} as T;
			},
			inflection<T extends Surface<"de", "Inflection">>(
				input: Omit<T, "language" | "surfaceKind"> & {
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
				} as T;
			},
		},
		selection: {
			standard<T extends Selection<"de", "Standard">>(
				input: Omit<T, "language" | "orthographicStatus"> & {
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
				} as T;
			},
			typo<T extends Selection<"de", "Typo">>(
				input: Omit<T, "language" | "orthographicStatus"> & {
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
				} as T;
			},
		},
	};

	return operations;
}
