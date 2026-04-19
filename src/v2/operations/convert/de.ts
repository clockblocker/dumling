import type {
	Lemma,
	LemmaKindForSurfaceKind,
	LemmaSubKindFor,
	Selection,
	Surface,
	SurfaceKindFor,
} from "../../public-types";
import { buildDeSelectionFromSurface } from "./shared";

type SurfaceFromLemma<T extends Lemma<"de">> = T extends Lemma<"de", infer LK, infer LSK>
	? Surface<
			"de",
			"Lemma",
			LK & Lemma<"de">["lemmaKind"],
			LSK & LemmaSubKindFor<"de", LK & Lemma<"de">["lemmaKind"]>
		>
	: never;

export function buildDeConvertOperations() {
	function toSurface<T extends Lemma<"de">>(lemma: T): SurfaceFromLemma<T> {
		return {
			language: "de",
			normalizedFullSurface: lemma.canonicalLemma,
			surfaceKind: "Lemma",
			lemma,
		} as SurfaceFromLemma<T>;
	}

	const operations = {
		lemma: {
			toSurface,
			toSelection<T extends Lemma<"de">>(lemma: T, options = {}) {
				return buildDeSelectionFromSurface(toSurface(lemma), options) as Selection<
					"de",
					Selection<"de">["orthographicStatus"],
					"Lemma",
					T extends Lemma<"de", infer LK, any>
						? LK & Lemma<"de">["lemmaKind"]
						: never,
					T extends Lemma<"de", infer LK, infer LSK>
						? LSK & LemmaSubKindFor<"de", LK & Lemma<"de">["lemmaKind"]>
						: never
				>;
			},
		},
		surface: {
			toSelection<
				SK extends SurfaceKindFor<"de">,
				LK extends LemmaKindForSurfaceKind<"de", SK>,
				LSK extends LemmaSubKindFor<"de", LK>,
			>(surface: Surface<"de", SK, LK, LSK>, options = {}) {
				return buildDeSelectionFromSurface(surface, options) as Selection<
					"de",
					Selection<"de">["orthographicStatus"],
					SK,
					LK,
					LSK
				>;
			},
		},
	};

	return operations;
}
