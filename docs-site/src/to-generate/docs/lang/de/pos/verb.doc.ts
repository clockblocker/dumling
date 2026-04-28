import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "VERB-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "VERB",
  order: 4006,
  subject: "VERB",
  title: "VERB",
  body: "`VERB` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [HasGovPrep](/de/feature/HasGovPrep.html)\n- [HasSepPrefix](/de/feature/HasSepPrefix.html)\n- [LexicallyReflexive](/de/feature/LexicallyReflexive.html)\n- [VerbType](/de/feature/VerbType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
