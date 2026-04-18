import type z from "zod/v3";
import type {
	DeprecatedLemmaKind,
	DeprecatedOrthographicStatus,
} from "./universal/enums/core/selection";
import type { DeprecatedLemmaDiscriminatorFor } from "./universal/lemma-discriminator";

type SupportedSelectionLemmaKindsBySurface = {
	Inflection: "Lexeme";
	Lemma: DeprecatedLemmaKind;
};

type SupportedSelectionSurfaceKind =
	keyof SupportedSelectionLemmaKindsBySurface;

type SupportedSelectionLemmaKindFor<SK extends SupportedSelectionSurfaceKind> =
	SupportedSelectionLemmaKindsBySurface[SK];

type DiscriminatorSchemaShape<LK extends DeprecatedLemmaKind> = Partial<{
	[D in DeprecatedLemmaDiscriminatorFor<LK>]: z.ZodTypeAny;
}>;

export type DeprecatedSelectionSchemaLanguageShape = {
	[OS in Exclude<DeprecatedOrthographicStatus, "Unknown">]: {
		[SK in SupportedSelectionSurfaceKind]: {
			[LK in SupportedSelectionLemmaKindFor<SK>]: DiscriminatorSchemaShape<LK>;
		};
	};
};

export type DeprecatedSurfaceSchemaLanguageShape = {
	[SK in SupportedSelectionSurfaceKind]: {
		[LK in SupportedSelectionLemmaKindFor<SK>]: DiscriminatorSchemaShape<LK>;
	};
};

export type DeprecatedLemmaSchemaLanguageShape = {
	[LK in DeprecatedLemmaKind]: DiscriminatorSchemaShape<LK>;
};
