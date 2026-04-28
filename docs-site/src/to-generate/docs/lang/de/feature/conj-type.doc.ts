import { defineLanguageOverlayPage } from "../../../../../lib/docs/source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
	description: "German ConjType.",
	family: "feature",
	leaf: "ConjType",
	order: 8013,
	subject: "ConjType",
	title: "ConjType",
	body: `
German currently exposes \`conjType\` as a lemma-level inherent feature on conjunction lexemes.

At the moment, the public German schemas only allow \`conjType: "Comp"\`. The abstract enum also contains \`Oper\`, but that value is not currently used in the German pack.
`,
});

export default document;
