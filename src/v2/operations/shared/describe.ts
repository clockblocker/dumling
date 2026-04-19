import type {
	LanguageApi,
	Lemma,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../public-types";
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
				} as ReturnType<LanguageApi<L>["describe"]["as"]["lemma"]>;
			},
			surface(value: EntityValue<L>) {
				if ("surfaceKind" in value) {
					return {
						language: value.language,
						surfaceKind: value.surfaceKind,
						lemmaKind: value.lemma.lemmaKind,
						lemmaSubKind: value.lemma.lemmaSubKind,
					} as ReturnType<LanguageApi<L>["describe"]["as"]["surface"]>;
				}

				if ("surface" in value) {
					return {
						language: value.language,
						surfaceKind: value.surface.surfaceKind,
						lemmaKind: value.surface.lemma.lemmaKind,
						lemmaSubKind: value.surface.lemma.lemmaSubKind,
					} as ReturnType<LanguageApi<L>["describe"]["as"]["surface"]>;
				}

				return {
					language: value.language,
					surfaceKind: "Lemma",
					lemmaKind: value.lemmaKind,
					lemmaSubKind: value.lemmaSubKind,
				} as ReturnType<LanguageApi<L>["describe"]["as"]["surface"]>;
			},
			selection(value: EntityValue<L>) {
				if ("surface" in value) {
					return {
						language: value.language,
						orthographicStatus: value.orthographicStatus,
						surfaceKind: value.surface.surfaceKind,
						lemmaKind: value.surface.lemma.lemmaKind,
						lemmaSubKind: value.surface.lemma.lemmaSubKind,
					} as ReturnType<LanguageApi<L>["describe"]["as"]["selection"]>;
				}

				if ("surfaceKind" in value) {
					return {
						language: value.language,
						orthographicStatus: "Standard",
						surfaceKind: value.surfaceKind,
						lemmaKind: value.lemma.lemmaKind,
						lemmaSubKind: value.lemma.lemmaSubKind,
					} as ReturnType<LanguageApi<L>["describe"]["as"]["selection"]>;
				}

				return {
					language: value.language,
					orthographicStatus: "Standard",
					surfaceKind: "Lemma",
					lemmaKind: value.lemmaKind,
					lemmaSubKind: value.lemmaSubKind,
				} as ReturnType<LanguageApi<L>["describe"]["as"]["selection"]>;
			},
		},
	} as unknown as LanguageApi<L>["describe"];
}
