import { attestation as am } from "../../../../attestations/de/selection/Am_nächsten_Morgen_war_alles_anders/[Am]_nächsten_Morgen_war_alles_anders.ts";
import { attestation as dieArticle } from "../../../../attestations/de/selection/Die_Peitsche_hat_er_mitgebrachtund_nimmt_sie_sorglich_sehr_in_acht/[Die]_Peitsche_hat_er_mitgebrachtund_nimmt_sie_sorglich_sehr_in_acht.ts";
import { attestation as ihrem } from "../../../../attestations/de/selection/Bitte_folgen_Sie_Ihrem_Ansprechpartner/Bitte_folgen_Sie_[Ihrem]_Ansprechpartner.ts";
import { attestation as wegen } from "../../../../attestations/de/selection/Wegen_dem_Regen_kamen_wir_zu_spät/[Wegen]_dem_Regen_kamen_wir_zu_spät.ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	body: "Some of the highest-value German fixes are not exotic syntax rules. They are selection-facing defaults: keep ordinary capitalization unmarked, keep `meaningInEmojis` local to the selected item, and avoid inflating feature bundles that the attestation does not actually license.",
	examples: [am, wegen],

	subsections: [
		{
			heading: "Sentence-Initial Capitals Are Still Canonical",
			body: "Do not mark a selection as `spelling=Variant` just because it appears sentence-initially with an initial capital. Common fusions, articles, and other ordinary forms keep their usual analysis.",
			examples: [am, dieArticle],
		},
		{
			heading: "Meaning Stays On The Selected Item",
			body: "`meaningInEmojis` should describe the selected form itself, not the wider scene or nearby noun phrase. A preposition still gets the preposition's meaning, not the weather or time phrase around it.",
			examples: [wegen],
		},
		{
			heading: "Only Encode Recoverable Possessor Features",
			body: "Do not add `gender[psor]` or `number[psor]` unless the attested form or context actually disambiguates them. Keep the annotation as lean as the evidence allows.",
			examples: [ihrem],
		},
	],

	meta: {
		description: "Small but high-impact German defaults for capitalization, emoji meaning, and feature inflation.",
		order: 112,
		title: "Selection-Facing Defaults",
	},
} satisfies RuleDocument;

export default document;
