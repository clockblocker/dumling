import { attestation as dasMuss } from "../../../../attestations/de/selection/Das_muss_heute_noch_raus/Das_[muss]_heute_noch_raus.ts";
import { attestation as erMuss } from "../../../../attestations/de/selection/Er_muss_heute_arbeiten/Er_[muss]_heute_arbeiten.ts";
import { attestation as haetten } from "../../../../attestations/de/selection/Wir_hätten_gern_mehr_Zeit/Wir_[hätten]_gern_mehr_Zeit.ts";
import { attestation as waere } from "../../../../attestations/de/selection/Das_wäre_fast_schief_gewesen/Das_[wäre]_fast_schief_gewesen.ts";
import { attestation as ward } from "../../../../attestations/de/selection/Jetzt_schien_die_Sonne_gar_zu_sehrda_ward_ihm_sein_Gewehr_zu_schwer/Jetzt_schien_die_Sonne_gar_zu_sehrda_[ward]_ihm_sein_Gewehr_zu_schwer.ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	body: "Do not classify all finite helper-looking verbs alike. The key question is whether the selected finite form is actually auxiliary-marking another overt verbal form or whether it carries the clause's own predication.",
	examples: [erMuss, dasMuss, ward],

	subsections: [
		{
			heading: "True Auxiliary Uses Stay AUX",
			body: "Finite forms such as `wäre` or `hätten` stay `AUX` when they are functioning as actual auxiliaries rather than as the clause's lexical predicate.",
			examples: [waere, haetten],
		},
		{
			heading: "Finite Modals Split By Overt Infinitive Support",
			body: "Use `AUX` when the modal auxiliary-marks an overt infinitive. Use `VERB` when the modal stands as the main predicate in an elliptical clause with no overt infinitive for it to host.",
			examples: [erMuss, dasMuss],
		},
		{
			heading: "Finite Werden Can Be Lexical",
			body: "Finite `werden` is not automatically auxiliary. When it carries its own change-of-state meaning with a predicative complement, keep it as `VERB`.",
			examples: [ward],
		},
	],

	meta: {
		description: "How German finite forms split between AUX and lexical VERB analyses.",
		order: 116,
		title: "Finite Auxiliaries Vs Lexical Verbs",
	},
} satisfies RuleDocument;

export default document;
