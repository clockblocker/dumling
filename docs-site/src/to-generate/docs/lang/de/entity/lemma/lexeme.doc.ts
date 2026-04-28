import { defineLanguageOverlayPage } from "../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
	description: "Überblick über die öffentlichen Lexem-Untertypen des deutschen Packs.",
	family: "pos",
	order: 4000,
	subject: "lexeme",
	title: "Lexeme",
	body: `
Die Lexem-Seiten bilden die öffentlichen Wortarten des deutschen Packs ab und verlinken auf die grammatischen Feature-Seiten, die für die jeweilige Wortart im Modell benutzt werden.
`,
});

export default document;
