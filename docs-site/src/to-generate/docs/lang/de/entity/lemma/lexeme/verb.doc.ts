import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "VERB-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "VERB",
  order: 4006,
  subject: "VERB",
  title: "VERB",
  body: "`VERB` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [HasGovPrep](/de/feature/has-gov-prep/)\n- [HasSepPrefix](/de/feature/has-sep-prefix/)\n- [LexicallyReflexive](/de/feature/lexically-reflexive/)\n- [VerbType](/de/feature/verb-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
