import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeInflectionSelection,
	DeLexemeInflectionSurface,
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";
import type { DeVerbalInflectionalFeatures } from "../shared/de-verbal-inflection-features";

type DeAuxiliaryVerbType = "Mod";

export type DeAuxiliaryInherentFeatures = {
	verbType?: DeAuxiliaryVerbType;
};

export type DeAuxiliaryLemma = DeLexemeLemma<"AUX", DeAuxiliaryInherentFeatures>;
export type DeAuxiliaryLemmaSurface = DeLexemeLemmaSurface<
	"AUX",
	DeAuxiliaryInherentFeatures
>;
export type DeAuxiliaryInflectionSurface = DeLexemeInflectionSurface<
	"AUX",
	DeAuxiliaryInherentFeatures,
	DeVerbalInflectionalFeatures
>;
export type DeAuxiliaryLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"AUX", DeAuxiliaryInherentFeatures, OS>;
export type DeAuxiliaryInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"AUX",
	DeAuxiliaryInherentFeatures,
	DeVerbalInflectionalFeatures,
	OS
>;

export type DeAuxiliaryTypes = {
	InflectionSelection: DeAuxiliaryInflectionSelection;
	InflectionSurface: DeAuxiliaryInflectionSurface;
	Lemma: DeAuxiliaryLemma;
	LemmaSelection: DeAuxiliaryLemmaSelection;
	LemmaSurface: DeAuxiliaryLemmaSurface;
};
