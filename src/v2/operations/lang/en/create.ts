import type { Lemma, Selection, Surface } from "../../../public-types";

type EnCreateLemma = <T extends Lemma<"en">>(
    input: Omit<T, "language"> & {
        language?: unknown;
    },
) => T;

type EnCreateLemmaSurface = <T extends Surface<"en", "Lemma">>(
    input: Omit<T, "language" | "surfaceKind"> & {
        language?: unknown;
        surfaceKind?: unknown;
    },
) => T;

type EnCreateInflectionSurface = <T extends Surface<"en", "Inflection">>(
    input: Omit<T, "language" | "surfaceKind"> & {
        language?: unknown;
        surfaceKind?: unknown;
    },
) => T;

type EnCreateStandardSelection = <T extends Selection<"en", "Standard">>(
    input: Omit<T, "language" | "orthographicStatus"> & {
        language?: unknown;
        orthographicStatus?: unknown;
    },
) => T;

type EnCreateTypoSelection = <T extends Selection<"en", "Typo">>(
    input: Omit<T, "language" | "orthographicStatus"> & {
        language?: unknown;
        orthographicStatus?: unknown;
    },
) => T;

export function buildEnCreateOperations() {
    const createLemma: EnCreateLemma = (input: any) =>
        ({
            language: "en",
            canonicalLemma: input.canonicalLemma,
            lemmaKind: input.lemmaKind,
            lemmaSubKind: input.lemmaSubKind,
            inherentFeatures: input.inherentFeatures ?? {},
            meaningInEmojis: input.meaningInEmojis,
        }) as never;

    const createLemmaSurface: EnCreateLemmaSurface = (input: any) =>
        ({
            language: "en",
            normalizedFullSurface: input.normalizedFullSurface,
            surfaceKind: "Lemma",
            lemma: input.lemma,
        }) as never;

    const createInflectionSurface: EnCreateInflectionSurface = (input: any) =>
        ({
            language: "en",
            normalizedFullSurface: input.normalizedFullSurface,
            surfaceKind: "Inflection",
            lemma: input.lemma,
            inflectionalFeatures: input.inflectionalFeatures,
        }) as never;

    const createStandardSelection: EnCreateStandardSelection = (input: any) =>
        ({
            language: "en",
            orthographicStatus: "Standard",
            selectionCoverage: input.selectionCoverage,
            spelledSelection: input.spelledSelection,
            spellingRelation: input.spellingRelation,
            surface: input.surface,
        }) as never;

    const createTypoSelection: EnCreateTypoSelection = (input: any) =>
        ({
            language: "en",
            orthographicStatus: "Typo",
            selectionCoverage: input.selectionCoverage,
            spelledSelection: input.spelledSelection,
            spellingRelation: input.spellingRelation,
            surface: input.surface,
        }) as never;

    return {
        lemma: createLemma,
        surface: {
            lemma: createLemmaSurface,
            inflection: createInflectionSurface,
        },
        selection: {
            standard: createStandardSelection,
            typo: createTypoSelection,
        },
    };
}
