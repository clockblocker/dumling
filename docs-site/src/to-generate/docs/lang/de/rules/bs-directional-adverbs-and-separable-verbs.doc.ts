import { attestation as hinaus } from "../../../../attestations/de/selection/Er_lief_erst_nach_links_und_dann_hinaus/Er_lief_erst_nach_links_und_dann_[hinaus].ts";
import { attestation as fort } from "../../../../attestations/de/selection/Fort_geht_nun_die_Mutter_undwupp_den_Daumen_in_den_Mund/[Fort]_geht_nun_die_Mutter_undwupp_den_Daumen_in_den_Mund.ts";
import { attestation as hinauslaufen } from "../../../../attestations/de/selection/Er_versucht_hinauszulaufen/Er_versucht_[hinauszulaufen].ts";
import { attestation as raus } from "../../../../attestations/de/selection/Das_muss_heute_noch_raus/Das_muss_heute_noch_[raus].ts";
import { attestation as hinausField } from "../../../../attestations/de/selection/nahm_Ranzen_Pulverhorn_und_Flintund_lief_hinaus_ins_Feld_geschwind/nahm_Ranzen_Pulverhorn_und_Flintund_lief_[hinaus]_ins_Feld_geschwind.ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	body: "Short directional items are easy to over-attach to a larger separable verb. The default dumling-way is narrower: keep them as standalone `ADV` unless the form itself clearly packages the verbal lexeme.",
	examples: [raus, hinaus, hinauslaufen],

	subsections: [
		{
			heading: "Elliptical And Compositional Directionals Stay ADV",
			body: "Do not invent a larger verb lemma from clause meaning alone. In elliptical clauses or ordinary motion clauses, short directional forms like `raus`, `fort`, or `hinaus` stay standalone adverbs unless something in the actual form forces the bigger analysis.",
			examples: [raus, fort, hinaus, hinausField],
		},
		{
			heading: "Overt Verb Packaging Can Force The Larger Verb",
			body: "When the selected surface itself exposes the separable verb, use the verbal analysis. Infinitives like `hinauszulaufen` are not just directional adverbs plus context; the larger lexeme is overtly present in the form.",
			examples: [hinauslaufen],
		},
	],

	meta: {
		description: "When German directional items stay ADV and when the larger separable verb is overt enough to win.",
		order: 114,
		title: "Directional Adverbs And Separable Verbs",
	},
} satisfies RuleDocument;

export default document;
