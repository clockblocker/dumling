import type {
	LanguageApi,
	Lemma,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../types/public-types";
import { extractLemma } from "./entity-accessors";

type EntityValue<L extends SupportedLanguage> = Lemma<L> | Surface<L> | Selection<L>;

export function buildDescribeOperations<L extends SupportedLanguage>(): LanguageApi<L>["describe"] {
	return {
		as: {
			lemma(value: EntityValue<L>) {
				const lemma = extractLemma(value);

				return {
					language: lemma.language,
					lemmaKind: lemma.lemmaKind,
					lemmaSubKind: lemma.lemmaSubKind,
				} as never;
			},
			surface(value: EntityValue<L>) {
				if ("surfaceKind" in value) {
					return {
						language: value.language,
						surfaceKind: value.surfaceKind,
						lemmaKind: value.lemma.lemmaKind,
						lemmaSubKind: value.lemma.lemmaSubKind,
					} as never;
				}

				if ("surface" in value) {
					return {
						language: value.language,
						surfaceKind: value.surface.surfaceKind,
						lemmaKind: value.surface.lemma.lemmaKind,
						lemmaSubKind: value.surface.lemma.lemmaSubKind,
					} as never;
				}

				return {
					language: value.language,
					surfaceKind: "Lemma",
					lemmaKind: value.lemmaKind,
					lemmaSubKind: value.lemmaSubKind,
				} as never;
			},
			selection(value: EntityValue<L>) {
				if ("surface" in value) {
					return {
						language: value.language,
						orthographicStatus: value.orthographicStatus,
						surfaceKind: value.surface.surfaceKind,
						lemmaKind: value.surface.lemma.lemmaKind,
						lemmaSubKind: value.surface.lemma.lemmaSubKind,
					} as never;
				}

				if ("surfaceKind" in value) {
					return {
						language: value.language,
						orthographicStatus: "Standard",
						surfaceKind: value.surfaceKind,
						lemmaKind: value.lemma.lemmaKind,
						lemmaSubKind: value.lemma.lemmaSubKind,
					} as never;
				}

				return {
					language: value.language,
					orthographicStatus: "Standard",
					surfaceKind: "Lemma",
					lemmaKind: value.lemmaKind,
					lemmaSubKind: value.lemmaSubKind,
				} as never;
			},
		},
	} as unknown as LanguageApi<L>["describe"];
}
