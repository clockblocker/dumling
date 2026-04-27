import { attestation as bahnhof } from "../../../../attestations/de/selection/Bei_dieser_Formel_verstehe_ich_nur_Bahnhof/Bei_dieser_Formel_verstehe_ich_nur_[Bahnhof].ts";
import { attestation as garIdiom } from "../../../../attestations/de/selection/Verbrannt_ist_alles_ganz_und_gardas_arme_Kind_mit_Haut_und_Haar/Verbrannt_ist_alles_ganz_und_[gar]das_arme_Kind_mit_Haut_und_Haar.ts";
import { attestation as haarLiteral } from "../../../../attestations/de/selection/Verbrannt_ist_alles_ganz_und_gardas_arme_Kind_mit_Haut_und_Haar/Verbrannt_ist_alles_ganz_und_gardas_arme_Kind_mit_Haut_und_[Haar].ts";
import { attestation as naJa } from "../../../../attestations/de/selection/Na_ja_ganz_überzeugt_bin_ich_nicht/[Na_ja]_ganz_überzeugt_bin_ich_nicht.ts";
import { attestation as nagel } from "../../../../attestations/de/selection/Damit_triffst_du_den_Nagel_auf_den_Kopf/Damit_triffst_du_den_[Nagel]_auf_den_Kopf.ts";
import { attestation as tutMirLeid } from "../../../../attestations/de/selection/Tut_mir_leid_das_war_mein_Fehler/[Tut_mir_leid]_das_war_mein_Fehler.ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	body: "The selected token is not always the learner-facing unit. When the meaning belongs to a larger idiom or discourse formula, point the selection there. When the same words are used literally, fall back to ordinary word-by-word classification.",
	examples: [bahnhof, naJa, haarLiteral],

	subsections: [
		{
			heading: "Partial Selection Of A Larger Unit Is Often Correct",
			body: "If the selected token is clearly just one visible piece of a conventional larger unit, keep the larger learner-facing unit and mark the selection as partial rather than forcing a standalone POS analysis.",
			examples: [bahnhof, nagel, naJa],
		},
		{
			heading: "Discourse Formulas Stay Phrasemes When The Utterance Uses Them That Way",
			body: "A fixed apology or discourse formula stays a `Phraseme/DiscourseFormula` when the live utterance meaning belongs to that formula itself rather than to a reportable lexical predicate.",
			examples: [tutMirLeid, naJa],
		},
		{
			heading: "Literal Readings Break The Idiom",
			body: "Do not keep a larger idiom if the attested sentence is using the words literally. In the same Stuwwelpeter line, `ganz und gar` stays a fixed intensifier while `mit Haut und Haar` is interpreted literally and must be classified token by token.",
			examples: [garIdiom, haarLiteral],
		},
	],

	meta: {
		description: "When German selections should resolve to larger phrasemes and when literal readings should win instead.",
		order: 117,
		title: "Phrasemes, Formulas, And Literal Readings",
	},
} satisfies RuleDocument;

export default document;
