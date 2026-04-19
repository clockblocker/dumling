import type {
	Selection,
	Surface,
} from "../../../public-types";

export type DeSelectionOptions = Partial<
	Pick<
		Selection<"de">,
		| "orthographicStatus"
		| "selectionCoverage"
		| "spelledSelection"
		| "spellingRelation"
	>
>;

export function buildDeSelectionFromSurface(
	surface: Surface<"de">,
	options: DeSelectionOptions = {},
): Selection<"de"> {
	return {
		language: surface.language,
		orthographicStatus: options.orthographicStatus ?? "Standard",
		selectionCoverage: options.selectionCoverage ?? "Full",
		spelledSelection: options.spelledSelection ?? surface.normalizedFullSurface,
		spellingRelation: options.spellingRelation ?? "Canonical",
		surface,
	} as Selection<"de">;
}
