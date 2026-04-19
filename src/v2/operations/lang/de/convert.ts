import type { Lemma, Selection, Surface } from "../../../public-types";
import { buildDeSelectionFromSurface } from "./shared";

type DeLemmaToSurface = <T extends Lemma<"de">>(
	lemma: T,
) => Extract<Surface<"de", "Lemma">, { lemma: T }>;

export function buildDeConvertOperations() {
	const toSurface: DeLemmaToSurface = (lemma: any) =>
		({
			language: "de",
			normalizedFullSurface: lemma.canonicalLemma,
			surfaceKind: "Lemma",
			lemma,
		}) as never;

	const operations = {
		lemma: {
			toSurface,
			toSelection<T extends Lemma<"de">>(lemma: T, options = {}) {
				return buildDeSelectionFromSurface(toSurface(lemma), options) as Selection<"de">;
			},
		},
		surface: {
			toSelection(surface: Surface<"de">, options = {}) {
				return buildDeSelectionFromSurface(surface, options) as Selection<"de">;
			},
		},
	};

	return operations;
}
